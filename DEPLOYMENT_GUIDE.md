# 🚀 Complete Jenkins CI/CD Deployment Guide for EC2

This comprehensive guide helps you set up a complete Jenkins CI/CD pipeline on AWS EC2 that automatically builds, deploys, and tests your Job Portal application when code is pushed to GitHub. Includes automated Selenium testing and email notifications.

## 📋 Prerequisites

- **EC2 Instance**: 16.171.23.187 (Amazon Linux 2)
- **SSH Key**: `F://downloads/devops.pem`
- **GitHub Repo**: https://github.com/khuramshahz/job-portal-app
- **Security Group**: Must allow ports 8080 (Jenkins), 5000 (App), and 22 (SSH)

## 🎯 Architecture Overview

```
GitHub Push → Webhook → Jenkins Pipeline → Docker Compose → Application Running → Automated Tests → Email Notification
```

**Pipeline Stages:**
1. ✅ Checkout code from GitHub
2. ✅ Stop existing containers
3. ✅ Build and deploy with Docker Compose
4. ✅ Run 12 automated Selenium tests
5. ✅ Publish test results in Jenkins
6. ✅ Send email with test summary to commit author

---

## 📝 Step-by-Step Setup

### Step 1: Connect to EC2 Instance

```powershell
ssh -i F://downloads/devops.pem ec2-user@16.171.23.187
```

### Step 2: Upload and Run Initial Setup Script

**On your local machine (PowerShell):**

```powershell
# Navigate to your project directory
cd "F:\7th semester\devops\website"

# Copy setup script to EC2
scp -i F://downloads/devops.pem ec2-jenkins-complete-setup.sh ec2-user@16.171.23.187:~/

# Connect to EC2
ssh -i F://downloads/devops.pem ec2-user@16.171.23.187
```

**On EC2 instance:**

```bash
# Make script executable
chmod +x ec2-jenkins-complete-setup.sh

# Run the setup script (takes 3-5 minutes)
./ec2-jenkins-complete-setup.sh
```

**⚠️ IMPORTANT**: Save the Jenkins initial password that appears at the end!

### Step 3: Configure EC2 Security Group

In AWS Console:
1. Go to EC2 → Security Groups
2. Select your instance's security group
3. Add Inbound Rules:
   - **Port 8080** - Source: Your IP or 0.0.0.0/0 (Jenkins UI)
   - **Port 5000** - Source: 0.0.0.0/0 (Application)
   - **Port 22** - Source: Your IP (SSH)

### Step 4: Initial Jenkins Setup

1. **Access Jenkins**:
   - Open browser: `http://16.171.23.187:8080`

2. **Unlock Jenkins**:
   - Paste the initial admin password from Step 2

3. **Install Plugins**:
   - Select "Install suggested plugins"
   - Wait for installation to complete

4. **Create Admin User**:
   - Username: `admin`
   - Password: (choose a strong password)
   - Full Name: Your Name
   - Email: your@email.com

5. **Jenkins URL**:
   - Keep default: `http://16.171.23.187:8080/`
   - Click "Save and Finish"

### Step 5: Install Additional Jenkins Plugins

1. Go to **Manage Jenkins** → **Manage Plugins**
2. Click **Available** tab
3. Search and install these plugins:
   - ✅ GitHub Plugin
   - ✅ GitHub Branch Source Plugin
   - ✅ Docker Pipeline
   - ✅ Pipeline
   - ✅ Git Plugin

4. Check "Restart Jenkins when installation is complete"

### Step 6: Create Jenkins Pipeline Job

1. Click **New Item**
2. Enter name: `job-portal-pipeline`
3. Select **Pipeline**
4. Click **OK**

5. **Configure the job**:

   **General Section:**
   - ✅ Check "GitHub project"
   - Project url: `https://github.com/khuramshahz/job-portal-app/`

   **Build Triggers:**
   - ✅ Check "GitHub hook trigger for GITScm polling"

   **Pipeline Section:**
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/khuramshahz/job-portal-app`
   - Credentials: (leave empty for public repo)
   - Branch Specifier: `*/main`
   - Script Path: `Jenkinsfile`

6. Click **Save**

### Step 7: Configure Docker Permissions on EC2

**On EC2 instance:**

```bash
# Add Jenkins user to docker group
sudo usermod -aG docker jenkins

# Set docker socket permissions
sudo chmod 666 /var/run/docker.sock

# Restart Jenkins
sudo systemctl restart jenkins

# Verify docker works
docker ps
```

### Step 8: Set Up GitHub Webhook

1. Go to your GitHub repository: https://github.com/khuramshahz/job-portal-app

2. Click **Settings** → **Webhooks** → **Add webhook**

3. **Configure webhook**:
   - **Payload URL**: `http://16.171.23.187:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Which events**: Select "Just the push event"
   - ✅ Check "Active"

4. Click **Add webhook**

5. Verify: You should see a green checkmark after GitHub pings the webhook

### Step 9: Test the Pipeline Manually

1. In Jenkins, go to your `job-portal-pipeline` job
2. Click **Build Now**
3. Watch the build progress in **Console Output**
4. Wait for all stages to complete

### Step 10: Verify Deployment

**Check if containers are running:**

```bash
# On EC2 instance
docker ps

# You should see:
# - job-portal-web (your application)
# - job-portal-mongo (MongoDB database)
```

**Test the application:**

Open in browser: `http://16.171.23.187:5000`

You should see your Job Portal application running!

---

## 🔄 How It Works (Workflow)

1. **Developer pushes code** to GitHub repository
2. **GitHub webhook** sends notification to Jenkins
3. **Jenkins automatically triggers** the pipeline
4. **Pipeline executes**:
   - ✅ Checks out latest code
   - ✅ Builds React frontend (npm install & build)
   - ✅ Stops existing Docker containers
   - ✅ Builds new Docker images
   - ✅ Starts containers with docker-compose
   - ✅ Verifies deployment
5. **Application is live** at http://16.171.23.187:5000

---

## 🧪 Testing the Complete Setup

### Test 1: Manual Build

```bash
# In Jenkins UI
1. Go to job-portal-pipeline
2. Click "Build Now"
3. Check Console Output for success
```

### Test 2: Automatic Trigger (GitHub Push)

```powershell
# On your local machine
cd "F:\7th semester\devops\website"

# Make a small change
echo "# Test commit" >> README.md

# Commit and push
git add .
git commit -m "Test Jenkins pipeline trigger"
git push origin main

# Watch Jenkins UI - build should start automatically!
```

---

## 🐛 Troubleshooting

### Issue: Jenkins Can't Connect to Docker

```bash
# On EC2
sudo chmod 666 /var/run/docker.sock
sudo systemctl restart jenkins
```

### Issue: Build Fails at Frontend Build Stage

```bash
# On EC2, verify Node.js is installed
node --version
npm --version

# Should show v18.x or higher
```

### Issue: Webhook Not Triggering

1. Check GitHub webhook deliveries:
   - GitHub → Settings → Webhooks → Recent Deliveries
2. Verify Jenkins is accessible:
   ```bash
   curl http://16.171.23.187:8080/github-webhook/
   ```
3. Ensure Security Group allows port 8080

### Issue: Application Not Accessible

```bash
# Check if containers are running
docker ps

# Check logs
docker-compose logs web
docker-compose logs mongo

# Restart if needed
docker-compose down
docker-compose up -d
```

### Issue: Port Already in Use

```bash
# Find and kill process on port 5000
sudo lsof -i :5000
sudo kill -9 <PID>

# Or stop all containers
docker-compose down
```

---

## 📊 Monitoring and Maintenance

### View Application Logs

```bash
# On EC2 instance
docker-compose logs -f web     # Follow web app logs
docker-compose logs -f mongo   # Follow database logs
```

### View Jenkins Logs

```bash
sudo tail -f /var/log/jenkins/jenkins.log
```

### Restart Services

```bash
# Restart Jenkins
sudo systemctl restart jenkins

# Restart Docker
sudo systemctl restart docker

# Restart Application
docker-compose restart
```

### Check Disk Space

```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -a
```

---

## 🔒 Security Best Practices

1. **Change Jenkins Admin Password** regularly
2. **Use HTTPS** (set up SSL certificate with Let's Encrypt)
3. **Restrict Security Group** to specific IP addresses
4. **Use GitHub Deploy Keys** instead of personal access tokens
5. **Set up Jenkins authentication** properly
6. **Regular backups** of Jenkins configuration and MongoDB data

---

## 📚 Additional Resources

- **Jenkins Documentation**: https://www.jenkins.io/doc/
- **Docker Compose**: https://docs.docker.com/compose/
- **GitHub Webhooks**: https://docs.github.com/en/webhooks

---

## 🎉 Success Checklist

- ✅ EC2 instance accessible via SSH
- ✅ Jenkins running on port 8080
- ✅ Docker and Docker Compose installed
- ✅ Jenkins pipeline job created
- ✅ GitHub webhook configured
- ✅ Manual build succeeds
- ✅ Automatic trigger on git push works
- ✅ Application accessible on port 5000
- ✅ Containers running and healthy

---

## 🆘 Need Help?

If you encounter issues:

1. Check Jenkins Console Output for error messages
2. Check Docker logs: `docker-compose logs`
3. Verify all ports are open in Security Group
4. Ensure docker permissions are set correctly
5. Check GitHub webhook delivery status

---

**Created**: December 2025  
**EC2 IP**: 16.171.23.187  
**Repository**: https://github.com/khuramshahz/job-portal-app
