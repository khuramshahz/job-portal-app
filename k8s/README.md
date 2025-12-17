# Minikube Deployment Guide for Job Portal Application

This guide explains how to deploy the Job Portal web application on a Minikube cluster running on an AWS EC2 instance. The application connects to MongoDB Atlas, so no in-cluster database is required. The guide also covers enabling Horizontal Pod Autoscaling (HPA) and exposing the application plus Minikube Dashboard using secure tunnels (ngrok).

## Prerequisites

- AWS EC2 instance (Ubuntu 22.04 or similar) with at least 2 vCPU, 4 GB RAM
- Docker and Docker Compose installed
- Minikube v1.33+ installed
- kubectl CLI installed
- Metrics Server add-on enabled in Minikube
- Ngrok (or similar tunneling tool) installed and authenticated
- Docker image `khuramshahz/job-portal-web:latest` pushed to Docker Hub (or update manifests with your own image)
- MongoDB Atlas cluster with a connection string that allows access from the EC2 instance's public IP

## 1. Start Minikube

```bash
minikube start --driver=docker --cpus=2 --memory=4096
minikube addons enable metrics-server
```

Confirm the cluster is ready:

```bash
kubectl get nodes
kubectl get pods -A
```

## 2. Deploy the Web Application

```bash
kubectl apply -f k8s/web-deployment.yaml
kubectl apply -f k8s/web-service.yaml

kubectl get pods -l app=job-portal-web -w
kubectl get svc job-portal-web-service
```

The web service listens on NodePort `32000`. Verify pod logs if needed:

```bash
kubectl logs -l app=job-portal-web
```

## 3. Configure Horizontal Pod Autoscaler

Ensure the metrics server is reporting:

```bash
kubectl top nodes
kubectl top pods
```

Apply the HPA manifest:

```bash
kubectl apply -f k8s/web-hpa.yaml
kubectl get hpa job-portal-web-hpa -w
```

The HPA keeps between 2 and 5 replicas based on CPU utilization (target 60%).

## 4. Expose Services Using Ngrok

### 4.1 Expose Web Application

Ngrok must forward traffic to the NodePort exposed by Minikube. First, retrieve the Minikube IP:

```bash
minikube ip
```

Run ngrok on the EC2 instance:

```bash
ngrok http --region=us --log=stdout $(minikube ip):32000
```

Record the generated HTTPS URL (e.g., `https://abcd-1234.ngrok.io`). This must remain active during evaluation.

### 4.2 Expose Minikube Dashboard

Launch the dashboard locally first:

```bash
minikube dashboard --url
```

The command prints a URL such as `http://127.0.0.1:43753/api/v1/namespaces/kubernetes-dashboard/services/http:kubernetes-dashboard:/proxy/`.

Expose it via ngrok on the EC2 instance:

```bash
ngrok http --region=us --log=stdout 127.0.0.1:43753
```

Copy the resulting HTTPS URL for submission. Keep this tunnel running during evaluation.

> **Tip:** Use separate ngrok configuration files or processes to manage the two tunnels simultaneously.

## 5. Validation Checklist

1. `kubectl get all` shows the web deployment and service running with the expected replica counts.
2. `kubectl get hpa job-portal-web-hpa` shows current metrics.
3. Accessing the ngrok web URL loads the Job Portal application and it connects to MongoDB Atlas successfully.
4. Accessing the ngrok dashboard URL loads the Minikube Dashboard.
5. Generating load (e.g., with `k6`, `hey`, or `ab`) increases CPU usage and triggers the HPA to scale beyond 2 pods.

## 6. Cleanup

To shut down the environment:

```bash
kubectl delete -f k8s/web-hpa.yaml
kubectl delete -f k8s/web-service.yaml
kubectl delete -f k8s/web-deployment.yaml
minikube stop
```

Terminate all ngrok tunnels after evaluation.
