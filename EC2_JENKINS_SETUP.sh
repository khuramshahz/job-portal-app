#!/bin/bash
# =============================================================================
# EC2 Jenkins Setup Script for MERN Job Portal
# Run this script on your EC2 instance (Amazon Linux 2/2023)
# =============================================================================

echo "======================================"
echo "Starting EC2 Jenkins Setup..."
echo "======================================"

# 1. Update system packages
echo "Step 1: Updating system packages..."
sudo yum update -y

# 2. Install Git
echo "Step 2: Installing Git..."
sudo yum install -y git

# 3. Install Docker
echo "Step 3: Installing Docker..."
sudo yum install -y docker
sudo systemctl enable docker
sudo systemctl start docker

# Add ec2-user to docker group
sudo usermod -aG docker ec2-user

# 4. Install Docker Compose
echo "Step 4: Installing Docker Compose..."
DOCKER_COMPOSE_VERSION="2.29.7"
sudo curl -SL "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" \
     -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker Compose installation
docker-compose --version

# 5. Install Java (required for Jenkins)
echo "Step 5: Installing Java..."
sudo yum install -y java-17-amazon-corretto-headless

# Verify Java installation
java -version

# 6. Install Node.js (for building frontend in Jenkins)
echo "Step 6: Installing Node.js..."
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs

# Verify Node.js installation
node --version
npm --version

# 7. Install Jenkins
echo "Step 7: Installing Jenkins..."
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo yum install -y jenkins

# Enable and start Jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins

# Add jenkins user to docker group
sudo usermod -aG docker jenkins

# Restart Jenkins to apply group changes
sudo systemctl restart jenkins

# 8. Wait for Jenkins to start
echo "Step 8: Waiting for Jenkins to start (30 seconds)..."
sleep 30

# 9. Get Jenkins initial admin password
echo "======================================"
echo "Jenkins Setup Complete!"
echo "======================================"
echo ""
echo "Jenkins Initial Admin Password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
echo ""
echo "======================================"
echo "IMPORTANT: Configure Your AWS Security Group"
echo "======================================"
echo "Open the following ports in your EC2 Security Group:"
echo "  - Port 22 (SSH)"
echo "  - Port 8080 (Jenkins)"
echo "  - Port 5000 (Application)"
echo ""
echo "======================================"
echo "Next Steps:"
echo "======================================"
echo "1. Log out and log back in for group changes to take effect:"
echo "   exit"
echo "   ssh -i F://downloads/devops.pem ec2-user@16.171.23.187"
echo ""
echo "2. Access Jenkins at: http://16.171.23.187:8080"
echo ""
echo "3. Use the password above to unlock Jenkins"
echo ""
echo "4. Install suggested plugins"
echo ""
echo "5. Create an admin user"
echo ""
echo "6. Follow the JENKINS_CONFIGURATION.md guide to:"
echo "   - Create the pipeline job"
echo "   - Configure GitHub webhook"
echo "   - Test the pipeline"
echo "======================================"
