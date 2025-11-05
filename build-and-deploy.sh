#!/bin/bash

# Complete Build and Deploy Script for Job Portal with Docker

set -e

echo "🚀 Starting Complete Docker Deployment Process..."

# Step 1: Build frontend with production API URL
echo "📦 Step 1: Building frontend..."
cd client
export VITE_API_URL=http://localhost:5000
npm install
npm run build
cd ..

# Step 2: Copy frontend build to server public directory
echo "📦 Step 2: Copying frontend build to server..."
mkdir -p server/public
cp -r client/dist/* server/public/

# Step 3: Build Docker image
echo "🔨 Step 3: Building Docker image..."
docker build -t job-portal-app:latest .

# Step 4: Tag for Docker Hub
echo "📝 Step 4: Tagging image..."
read -p "Enter your Docker Hub username (or press Enter to skip): " DOCKER_USERNAME
if [ ! -z "$DOCKER_USERNAME" ]; then
    docker tag job-portal-app:latest $DOCKER_USERNAME/job-portal-app:latest
    echo "📤 Pushing to Docker Hub..."
    docker login
    docker push $DOCKER_USERNAME/job-portal-app:latest
    echo "✅ Image pushed to Docker Hub: $DOCKER_USERNAME/job-portal-app:latest"
fi

# Step 5: Start with docker-compose
echo "🚀 Step 5: Starting containers..."
docker-compose down || true
docker-compose up -d

# Step 6: Wait and verify
echo "⏳ Waiting for services..."
sleep 15

echo "📊 Container Status:"
docker ps

echo "🧪 Testing API..."
curl -s http://localhost:5000/api/jobs | head -c 300
echo ""

echo "✅ Deployment Complete!"
echo "🌐 Access your application at: http://localhost:5000"

