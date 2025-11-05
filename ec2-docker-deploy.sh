#!/bin/bash

# Complete EC2 Docker Deployment Script
# Run this script on your EC2 instance after uploading files

set -e

echo "🚀 Starting Docker Deployment on EC2..."

# Step 1: Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    sudo apt update
    sudo apt install -y docker.io docker-compose
    sudo systemctl start docker
    sudo systemctl enable docker
    sudo usermod -aG docker $USER
    echo "✅ Docker installed"
    echo "⚠️  Please logout and login again for docker group changes to take effect"
    echo "⚠️  Then run this script again"
    exit 0
fi

# Step 2: Verify Docker is running
if ! sudo systemctl is-active --quiet docker; then
    echo "🔄 Starting Docker service..."
    sudo systemctl start docker
fi

# Step 3: Navigate to project directory
cd ~/job-portal-docker || {
    echo "❌ Directory ~/job-portal-docker not found"
    echo "Please create it and upload your files first"
    exit 1
}

# Step 4: Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Step 5: Build or pull image
if grep -q "image:" docker-compose.yml && ! grep -q "# image:" docker-compose.yml; then
    # Using Docker Hub image
    IMAGE_NAME=$(grep "image:" docker-compose.yml | head -1 | awk '{print $2}' | tr -d '"')
    echo "📥 Pulling image from Docker Hub: $IMAGE_NAME"
    docker pull $IMAGE_NAME || {
        echo "⚠️  Failed to pull image, building locally instead..."
        docker-compose build
    }
else
    # Building locally
    echo "🔨 Building Docker image locally..."
    docker-compose build
fi

# Step 6: Start containers
echo "🚀 Starting containers..."
docker-compose up -d

# Step 7: Wait for services
echo "⏳ Waiting for services to start..."
sleep 15

# Step 8: Check status
echo ""
echo "📊 Container Status:"
docker ps

# Step 9: Test API
echo ""
echo "🧪 Testing API endpoint..."
sleep 5
if curl -s http://localhost:5000/api/jobs > /dev/null; then
    echo "✅ API is responding!"
    curl -s http://localhost:5000/api/jobs | head -c 200
    echo ""
else
    echo "⚠️  API not responding yet. Check logs with: docker-compose logs web"
fi

# Step 10: Show MongoDB volume
echo ""
echo "💾 MongoDB Volume:"
docker volume ls | grep mongo-data || echo "Volume will be created on first run"

# Step 11: Get public IP
PUBLIC_IP=$(curl -s ifconfig.me)
echo ""
echo "✅ Deployment Complete!"
echo "🌐 Access your application at: http://$PUBLIC_IP:5000"
echo ""
echo "📝 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop: docker-compose down"
echo "   Restart: docker-compose restart"
echo "   Check status: docker ps"

