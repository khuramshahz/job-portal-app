# Docker Deployment Guide for Job Portal

## Overview
This guide explains how to containerize and deploy the Job Portal application using Docker and Docker Compose on AWS EC2.

## Prerequisites
- Docker installed locally
- Docker Hub account
- AWS EC2 instance with Docker and Docker Compose installed
- SSH access to EC2 instance

## Step 1: Build Docker Image Locally

```bash
# Build the Docker image
docker build -t job-portal-app:latest .
```

## Step 2: Tag Image for Docker Hub

```bash
# Replace 'your-dockerhub-username' with your actual Docker Hub username
docker tag job-portal-app:latest your-dockerhub-username/job-portal-app:latest
```

## Step 3: Push to Docker Hub

```bash
# Login to Docker Hub
docker login

# Push the image
docker push your-dockerhub-username/job-portal-app:latest
```

## Step 4: Deploy on EC2

### 4.1 Install Docker on EC2 (if not installed)

```bash
# Update system
sudo apt update

# Install Docker
sudo apt install -y docker.io docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group (to run docker without sudo)
sudo usermod -aG docker ubuntu
```

### 4.2 Upload Files to EC2

```bash
# From your local machine, upload docker-compose.yml and .env file
scp -i "F:\Downloads/devcompute.pem" docker-compose.yml ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com:~/
```

### 4.3 Create Production docker-compose.yml on EC2

On EC2, create a docker-compose.yml that uses your Docker Hub image:

```yaml
version: '3.8'

services:
  web:
    image: your-dockerhub-username/job-portal-app:latest
    container_name: job-portal-web
    restart: always
    ports:
      - "5000:5000"
    environment:
      - PORT=5000
      - MONGO_URI=mongodb://mongo:27017/job-application
      - JWT_SECRET=your_jwt_secret_key_here
      - NODE_ENV=production
    depends_on:
      - mongo
    networks:
      - job-portal-network

  mongo:
    image: mongo:7.0
    container_name: job-portal-mongo
    restart: always
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_DATABASE=job-application
    volumes:
      - mongo-data:/data/db
    networks:
      - job-portal-network

volumes:
  mongo-data:
    driver: local

networks:
  job-portal-network:
    driver: bridge
```

### 4.4 Run Application with Docker Compose

```bash
# Pull the image and start containers
docker-compose pull
docker-compose up -d

# Check running containers
docker ps

# View logs
docker-compose logs -f
```

## Step 5: Verify Deployment

```bash
# Test API endpoint
curl http://localhost:5000/api/jobs

# Check MongoDB connection
docker exec -it job-portal-mongo mongosh --eval "db.adminCommand('listDatabases')"
```

## Architecture

- **Web Container**: Node.js application serving both backend API and React frontend
- **MongoDB Container**: MongoDB database with persistent volume
- **Network**: Bridge network for inter-container communication
- **Volume**: Named volume `mongo-data` for database persistence

## Troubleshooting

1. **Container not starting**: Check logs with `docker-compose logs web`
2. **MongoDB connection issues**: Ensure MongoDB container is running and network is configured
3. **Port conflicts**: Change port mapping in docker-compose.yml if port 5000 is in use
4. **Permission errors**: Make sure user is in docker group: `sudo usermod -aG docker $USER`

