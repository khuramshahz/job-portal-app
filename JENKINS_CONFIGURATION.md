# Jenkins Pipeline Configuration Guide

## Overview
This guide walks you through configuring Jenkins on EC2 to automatically deploy your MERN Job Portal application when code is pushed to GitHub.

---

## Prerequisites Checklist

Before starting, ensure:

- ✅ EC2 instance is running (16.171.23.187)
- ✅ You have the SSH key: `F://downloads/devops.pem`
- ✅ GitHub repository: `https://github.com/khuramshahz/job-portal-app`
- ✅ AWS Security Group allows ports: 22 (SSH), 8080 (Jenkins), 5000 (App)

---

## Part 1: EC2 Initial Setup

### Step 1: Connect to EC2

```bash
ssh -i F://downloads/devops.pem ec2-user@16.171.23.187
```

### Step 2: Run Setup Script

```bash
# Download and run the setup script
curl -O https://raw.githubusercontent.com/khuramshahz/job-portal-app/main/EC2_JENKINS_SETUP.sh
chmod +x EC2_JENKINS_SETUP.sh
./EC2_JENKINS_SETUP.sh
```

**OR** manually copy the `EC2_JENKINS_SETUP.sh` file to EC2 and run it:

```bash
# On your local machine
scp -i F://downloads/devops.pem EC2_JENKINS_SETUP.sh ec2-user@16.171.23.187:~

# On EC2
chmod +x EC2_JENKINS_SETUP.sh
./EC2_JENKINS_SETUP.sh
```

### Step 3: Log Out and Back In

This is required for Docker group permissions to take effect:

```bash
exit
ssh -i F://downloads/devops.pem ec2-user@16.171.23.187
```

### Step 4: Verify Installation

```bash
docker --version
docker-compose --version
java -version
node --version
systemctl status jenkins
```

---

## Part 2: Configure AWS Security Group

1. Go to AWS Console → EC2 → Security Groups
2. Find your instance's security group
3. Add Inbound Rules:

| Type | Port | Source | Description |
|------|------|--------|-------------|
| SSH | 22 | Your IP | SSH access |
| Custom TCP | 8080 | 0.0.0.0/0 | Jenkins UI |
| Custom TCP | 5000 | 0.0.0.0/0 | Application |

---

## Part 3: Jenkins Initial Configuration

### Step 1: Access Jenkins

1. Open browser: `http://16.171.23.187:8080`
2. Get initial password from EC2:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

3. Paste the password in Jenkins unlock screen

### Step 2: Install Plugins

1. Select **"Install suggested plugins"**
2. Wait for installation to complete (5-10 minutes)

### Step 3: Create Admin User

Fill in the form:
- Username: `admin`
- Password: `your_secure_password`
- Full name: `Admin`
- Email: `your_email@example.com`

### Step 4: Jenkins URL

Keep the default: `http://16.171.23.187:8080/`

Click **"Save and Finish"** → **"Start using Jenkins"**

---

## Part 4: Create Pipeline Job

### Step 1: Create New Item

1. Click **"New Item"** (top left)
2. Enter name: `job-portal-pipeline`
3. Select **"Pipeline"**
4. Click **"OK"**

### Step 2: Configure Pipeline

#### General Section:
- ✅ Check **"GitHub project"**
- Project url: `https://github.com/khuramshahz/job-portal-app/`

#### Build Triggers:
- ✅ Check **"GitHub hook trigger for GITScm polling"**

#### Pipeline Section:
- Definition: **"Pipeline script from SCM"**
- SCM: **Git**
- Repository URL: `https://github.com/khuramshahz/job-portal-app.git`
- Credentials: **None** (for public repo) or add GitHub token if private
- Branch Specifier: `*/main`
- Script Path: `Jenkinsfile`

### Step 3: Save

Click **"Save"** at the bottom

---

## Part 5: Configure GitHub Webhook

### Step 1: Go to GitHub Repository

1. Open: `https://github.com/khuramshahz/job-portal-app`
2. Click **"Settings"** → **"Webhooks"** → **"Add webhook"**

### Step 2: Configure Webhook

- **Payload URL**: `http://16.171.23.187:8080/github-webhook/`
- **Content type**: `application/json`
- **Which events**: Select **"Just the push event"**
- **Active**: ✅ Checked

### Step 3: Save

Click **"Add webhook"**

GitHub will send a test ping. Check that you see a green checkmark.

---

## Part 6: Test the Pipeline

### Method 1: Manual Build

1. In Jenkins, go to your pipeline job
2. Click **"Build Now"**
3. Watch the build progress in **"Console Output"**

### Method 2: Automatic Trigger (Push to GitHub)

1. Make a small change in your local repo:

```bash
cd "F:\7th semester\devops\website"
echo "# Test commit" >> README.md
git add README.md
git commit -m "Test Jenkins trigger"
git push origin main
```

2. Jenkins should automatically start a build
3. Check Jenkins dashboard to see the build in progress

---

## Part 7: Verify Deployment

### Step 1: Check Build Status

In Jenkins, the build should show:
- ✅ Build Frontend (green)
- ✅ Build Containers (green)
- ✅ Verify Containers (green)

### Step 2: Check Running Containers

SSH to EC2 and run:

```bash
docker-compose ps
docker ps
```

You should see:
- `job-portal-web` (running on port 5000)
- `job-portal-mongo` (running on port 27017)

### Step 3: Access Application

Open browser: `http://16.171.23.187:5000`

You should see your Job Portal application running!

---

## Part 8: Troubleshooting

### Build Fails at "Build Frontend"

**Error**: `npm: command not found`

**Fix**:
```bash
# On EC2
sudo yum install -y nodejs
```

### Build Fails at "Build Containers"

**Error**: `permission denied while trying to connect to Docker daemon`

**Fix**:
```bash
# On EC2
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### GitHub Webhook Not Triggering

**Check**:
1. GitHub webhook shows green checkmark
2. Payload URL is correct: `http://16.171.23.187:8080/github-webhook/`
3. Jenkins job has "GitHub hook trigger" checked
4. Port 8080 is open in Security Group

### Application Not Accessible

**Check**:
1. Port 5000 is open in Security Group
2. Containers are running: `docker-compose ps`
3. Check logs: `docker-compose logs web`

### MongoDB Connection Issues

**Fix**:
```bash
# On EC2
docker-compose down
docker volume rm $(docker volume ls -q)
docker-compose up -d
```

---

## Part 9: Daily Workflow

Once everything is configured:

1. **Develop locally** on your machine
2. **Commit and push** to GitHub:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. **Jenkins automatically**:
   - Detects the push via webhook
   - Pulls latest code
   - Builds frontend (`npm run build`)
   - Builds Docker images
   - Starts containers with `docker-compose up -d`
4. **Application is live** at `http://16.171.23.187:5000`

---

## Part 10: Monitoring

### View Jenkins Logs

```bash
sudo tail -f /var/log/jenkins/jenkins.log
```

### View Application Logs

```bash
docker-compose logs -f web
docker-compose logs -f mongo
```

### Check Container Status

```bash
docker-compose ps
docker stats
```

---

## Summary

Your CI/CD pipeline is now configured:

✅ **Code Push** → GitHub detects push → Webhook triggers Jenkins  
✅ **Jenkins Build** → Pulls code → Builds frontend → Builds Docker images  
✅ **Deploy** → Starts containers with docker-compose  
✅ **Live** → Application accessible at http://16.171.23.187:5000

---

## Quick Reference Commands

### EC2 Access
```bash
ssh -i F://downloads/devops.pem ec2-user@16.171.23.187
```

### Jenkins Password
```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

### Container Management
```bash
docker-compose ps              # List containers
docker-compose logs web        # View web logs
docker-compose logs mongo      # View mongo logs
docker-compose down            # Stop containers
docker-compose up -d           # Start containers
docker-compose restart web     # Restart web container
```

### System Management
```bash
sudo systemctl status jenkins  # Jenkins status
sudo systemctl restart jenkins # Restart Jenkins
sudo systemctl status docker   # Docker status
```

---

## Need Help?

If you encounter issues:
1. Check Jenkins console output for detailed error messages
2. Check Docker logs: `docker-compose logs`
3. Verify Security Group settings in AWS
4. Ensure all prerequisites are met
5. Review the Troubleshooting section above
