# Jenkins CI/CD Setup Guide

## Overview
This guide explains how to set up Jenkins CI/CD pipeline for the Job Portal application on AWS EC2.

## Prerequisites Completed
✅ Java 11 installed  
✅ Jenkins installed  
✅ Docker installed  
✅ Docker Compose installed  

## Jenkins Setup Steps

### Step 1: Access Jenkins Web UI

1. **Get Jenkins Initial Admin Password:**
   ```bash
   ssh -i "F:/downloads/devcompute.pem" ubuntu@ec2-3-87-92-182.compute-1.amazonaws.com
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

2. **Access Jenkins:**
   - Open browser: `http://3.87.92.182:8080`
   - Enter the initial admin password from above
   - Click "Install suggested plugins"

### Step 2: Create Admin User

- Create your admin user (username/password)
- Save the configuration

### Step 3: Install Required Plugins

1. Go to **Manage Jenkins** → **Manage Plugins**
2. Install the following plugins (if not already installed):
   - ✅ **Git Plugin** (usually pre-installed)
   - ✅ **Pipeline Plugin** (usually pre-installed)
   - ✅ **Docker Pipeline Plugin**
   - ✅ **Docker Compose Plugin** (optional but helpful)

3. Click **Install without restart** or restart Jenkins

### Step 4: Configure GitHub Credentials

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **Global** → **Add Credentials**
3. Configure:
   - **Kind**: Username with password
   - **Username**: `khuramshahz`
   - **Password**: `K1h2u3t4@456`
   - **ID**: `github-credentials`
   - **Description**: GitHub Credentials
4. Click **OK**

### Step 5: Create GitHub Repository

**If you haven't created the repository yet:**

1. Go to GitHub: https://github.com/new
2. Repository name: `job-portal-app`
3. Make it **Public** or **Private** (your choice)
4. Click **Create repository**

5. **Push your code to GitHub:**
   ```bash
   # On your local machine
   cd "F:\7th semester\devops\website"
   git init
   git add .
   git commit -m "Initial commit - Job Portal application"
   git branch -M main
   git remote add origin https://github.com/khuramshahz/job-portal-app.git
   git push -u origin main
   ```

### Step 6: Create Jenkins Pipeline Job

1. Go to **New Item** in Jenkins dashboard
2. Enter item name: `job-portal-pipeline`
3. Select **Pipeline**
4. Click **OK**

5. **Configure Pipeline:**
   - **Definition**: Pipeline script from SCM
   - **SCM**: Git
   - **Repository URL**: `https://github.com/khuramshahz/job-portal-app.git`
   - **Credentials**: Select `github-credentials`
   - **Branches to build**: `*/main`
   - **Script Path**: `Jenkinsfile`
   - Click **Save**

### Step 7: Run the Pipeline

1. Click on **job-portal-pipeline** job
2. Click **Build Now**
3. Watch the build progress in **Build History**
4. Click on the build number to see detailed logs

## Pipeline Stages

The Jenkins pipeline will:

1. **Checkout**: Fetch code from GitHub
2. **Build Frontend**: Build React application
3. **Stop Previous Containers**: Clean up old containers
4. **Build and Run**: Start containers with docker-compose
5. **Wait for Services**: Wait for services to be ready
6. **Test Application**: Test the API endpoint

## Docker Compose Configuration

The pipeline uses `docker-compose.jenkins.yml` which:
- ✅ Uses **volumes** for code (instead of Dockerfile build)
- ✅ Uses **different ports**: 8081 (web), 27018 (mongo)
- ✅ Uses **different container names**: `jenkins-job-portal-web`, `jenkins-job-portal-mongo`

## Access Your Application

After successful pipeline run:
- **Web Application**: `http://3.87.92.182:8081`
- **API Endpoint**: `http://3.87.92.182:8081/api/jobs`

**Note**: Make sure Security Group allows inbound traffic on port 8080 (Jenkins) and 8081 (Application)

## Troubleshooting

### Jenkins not starting
```bash
# Check if Jenkins is running
sudo systemctl status jenkins

# If not, start manually
sudo -u jenkins /usr/bin/java -jar /usr/share/java/jenkins.war --httpPort=8080
```

### Docker permission issues
```bash
# Add Jenkins user to docker group
sudo usermod -aG docker jenkins
# Restart Jenkins
sudo systemctl restart jenkins
```

### Pipeline fails at checkout
- Verify GitHub credentials are correct
- Check repository URL and branch name
- Ensure Jenkinsfile is in the repository root

### Build fails
- Check Jenkins console output for errors
- Verify Docker and docker-compose are installed
- Check if ports 8081 and 27018 are available

## Files Created

1. **Jenkinsfile**: Pipeline script for Jenkins
2. **docker-compose.jenkins.yml**: Docker Compose config for Jenkins (volumes, different ports)
3. **JENKINS_SETUP_GUIDE.md**: This guide

## Next Steps

1. Set up GitHub repository and push code
2. Access Jenkins web UI and configure credentials
3. Create pipeline job
4. Run pipeline and verify it works
5. Set up automatic triggers (polling or webhooks) if needed

---

## Summary

✅ Jenkins installed on EC2  
✅ Docker and Docker Compose ready  
✅ Pipeline script created (Jenkinsfile)  
✅ Docker Compose config for Jenkins (docker-compose.jenkins.yml)  
⏳ GitHub repository needs to be created  
⏳ Jenkins web UI needs to be configured  
⏳ Pipeline job needs to be created and run  

