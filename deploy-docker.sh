#!/bin/bash

# Docker Deployment Script for Job Portal on EC2
# This script installs Docker, builds the image, and deploys the application

set -e

echo "🚀 Starting Docker Deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    sudo apt update
    sudo apt install -y docker.io docker-compose
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    echo "✅ Docker installed successfully"
else
    echo "✅ Docker is already installed"
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo apt install -y docker-compose
    echo "✅ Docker Compose installed successfully"
else
    echo "✅ Docker Compose is already installed"
fi

# Navigate to application directory
cd ~/job-portal-docker || exit

# Build Docker image
echo "🔨 Building Docker image..."
docker build -t job-portal-app:latest .

# Tag image for Docker Hub (replace with your Docker Hub username)
read -p "Enter your Docker Hub username: " DOCKER_USERNAME
if [ ! -z "$DOCKER_USERNAME" ]; then
    docker tag job-portal-app:latest $DOCKER_USERNAME/job-portal-app:latest
    echo "📤 Pushing image to Docker Hub..."
    docker login
    docker push $DOCKER_USERNAME/job-portal-app:latest
    echo "✅ Image pushed to Docker Hub"
fi

# Stop existing containers if running
echo "🛑 Stopping existing containers..."
docker-compose down || true

# Start containers with docker-compose
echo "🚀 Starting containers..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check container status
echo "📊 Container Status:"
docker ps

# Test API
echo "🧪 Testing API..."
sleep 5
curl -s http://localhost:5000/api/jobs | head -c 200
echo ""
echo ""

echo "✅ Deployment complete!"
echo "🌐 Application is running on http://$(curl -s ifconfig.me):5000"

