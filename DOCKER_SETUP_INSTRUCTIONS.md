# Docker Containerization and Deployment Guide

## Assignment Requirements Completed:
✅ Dockerfile created for web application  
✅ docker-compose.yml with web app and MongoDB containers  
✅ MongoDB volume configured for data persistence  
✅ Deployment instructions for Docker Hub and EC2  

---

## 📋 Prerequisites

1. **Docker Hub Account** (free at https://hub.docker.com)
2. **AWS EC2 Instance** running Ubuntu
3. **SSH Access** to EC2 instance

---

## 🐳 Step 1: Build Docker Image Locally (Optional)

If you have Docker Desktop installed on Windows:

```powershell
# Navigate to project directory
cd "F:\7th semester\devops\website"

# Build the Docker image
docker build -t job-portal-app:latest .
```

---

## 📤 Step 2: Push to Docker Hub

### 2.1 Login to Docker Hub

```powershell
docker login
# Enter your Docker Hub username and password
```

### 2.2 Tag Your Image

```powershell
# Replace 'YOUR_USERNAME' with your Docker Hub username
docker tag job-portal-app:latest YOUR_USERNAME/job-portal-app:latest
```

### 2.3 Push to Docker Hub

```powershell
docker push YOUR_USERNAME/job-portal-app:latest
```

**Example:**
```powershell
docker tag job-portal-app:latest johndoe/job-portal-app:latest
docker push johndoe/job-portal-app:latest
```

---

## 🚀 Step 3: Deploy on EC2

### 3.1 Connect to EC2 Instance

```powershell
ssh -i "F:\Downloads\devcompute.pem" ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com
```

### 3.2 Install Docker and Docker Compose

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

# Logout and login again for group changes to take effect
exit
```

Reconnect to EC2:
```powershell
ssh -i "F:\Downloads\devcompute.pem" ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com
```

### 3.3 Upload Deployment Files

From your local Windows machine, upload the necessary files:

```powershell
# Upload docker-compose.yml
scp -i "F:\Downloads\devcompute.pem" docker-compose.yml ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com:~/

# Upload Dockerfile
scp -i "F:\Downloads\devcompute.pem" Dockerfile ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com:~/

# Upload .dockerignore
scp -i "F:\Downloads\devcompute.pem" .dockerignore ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com:~/
```

### 3.4 Upload Application Code

```powershell
# Create a deployment package (excluding node_modules)
Compress-Archive -Path "server", "client" -DestinationPath "docker-deploy.zip" -Force

# Upload to EC2
scp -i "F:\Downloads\devcompute.pem" docker-deploy.zip ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com:~/
```

### 3.5 Setup on EC2

On EC2 instance:

```bash
# Create project directory
mkdir -p ~/job-portal-docker
cd ~/job-portal-docker

# Extract application code
unzip ~/docker-deploy.zip -d .

# Move Docker files to root
mv ~/docker-compose.yml .
mv ~/Dockerfile .
mv ~/.dockerignore .
```

### 3.6 Update docker-compose.yml for Docker Hub Image

Edit `docker-compose.yml` on EC2:

```bash
nano docker-compose.yml
```

Uncomment the `image` line and comment out the `build` section:

```yaml
web:
  # build:
  #   context: .
  #   dockerfile: Dockerfile
  image: YOUR_USERNAME/job-portal-app:latest  # Replace with your Docker Hub image
```

### 3.7 Deploy with Docker Compose

**Option A: Using Docker Hub Image (Recommended)**

```bash
# Pull image from Docker Hub
docker pull YOUR_USERNAME/job-portal-app:latest

# Start containers
docker-compose up -d
```

**Option B: Build Locally on EC2**

If you prefer to build on EC2 instead of using Docker Hub:

```bash
# Keep build section in docker-compose.yml
docker-compose up -d --build
```

### 3.8 Verify Deployment

```bash
# Check running containers
docker ps

# View logs
docker-compose logs -f

# Test API
curl http://localhost:5000/api/jobs
```

### 3.9 Configure Security Group

Make sure your EC2 Security Group allows inbound traffic on:
- **Port 5000** (HTTP) - for web application
- **Port 22** (SSH) - for remote access

---

## 📊 Docker Architecture

### Containers:
1. **job-portal-web**: Node.js application serving backend API and React frontend
2. **job-portal-mongo**: MongoDB database container

### Volumes:
- **mongo-data**: Persistent volume for MongoDB data storage (`/data/db`)

### Network:
- **job-portal-network**: Bridge network for container communication

---

## 🔍 Verification Commands

```bash
# List all containers
docker ps -a

# View container logs
docker logs job-portal-web
docker logs job-portal-mongo

# Check MongoDB data persistence
docker exec -it job-portal-mongo mongosh --eval "db.adminCommand('listDatabases')"

# Stop containers
docker-compose down

# Stop and remove volumes (CAUTION: deletes data)
docker-compose down -v

# Restart containers
docker-compose restart
```

---

## 🐛 Troubleshooting

### Issue: Container fails to start
```bash
# Check logs
docker-compose logs web

# Check container status
docker ps -a
```

### Issue: MongoDB connection error
```bash
# Verify MongoDB container is running
docker ps | grep mongo

# Check network connectivity
docker exec job-portal-web ping mongo
```

### Issue: Port already in use
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill the process or change port in docker-compose.yml
```

### Issue: Permission denied
```bash
# Add user to docker group
sudo usermod -aG docker $USER
# Logout and login again
```

---

## 📝 Summary

✅ **Dockerfile**: Multi-stage build for web application  
✅ **docker-compose.yml**: Orchestrates web and MongoDB containers  
✅ **Volume**: MongoDB data persistence with named volume  
✅ **Docker Hub**: Image pushed to public/private repository  
✅ **EC2 Deployment**: Application running in containers  

---

## 🌐 Access Your Application

Once deployed, access your application at:
```
http://YOUR_EC2_PUBLIC_IP:5000
```

Example:
```
http://3.87.75.23:5000
```

---

## 📸 Screenshots Needed for Assignment

1. Dockerfile contents
2. docker-compose.yml contents showing volume configuration
3. Docker Hub repository with pushed image
4. Docker build process output
5. `docker ps` showing running containers
6. `docker volume ls` showing persistent volume
7. Application running on EC2 public IP
8. MongoDB data verification (showing data persistence)

