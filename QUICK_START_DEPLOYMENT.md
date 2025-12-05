# Quick Start - Deploy Jenkins Pipeline to EC2

## What This Does

This guide sets up a complete CI/CD pipeline where:
- Website is initially DOWN (no containers running on EC2)
- When you push code to GitHub, Jenkins automatically:
  1. Detects the push via webhook
  2. Builds your frontend
  3. Builds Docker containers
  4. Brings UP the application with `docker-compose up -d`

---

## Prerequisites

✅ EC2 Instance: `16.171.23.187`  
✅ SSH Key: `F://downloads/devops.pem`  
✅ GitHub Repo: `https://github.com/khuramshahz/job-portal-app`  
✅ AWS Security Group ports open: 22, 8080, 5000

---

## Step 1: Push Updated Files to GitHub

On your **local machine** (Windows PowerShell):

```powershell
# Navigate to your project
cd "F:\7th semester\devops\website"

# Add all changes (including updated Jenkinsfile)
git add .
git commit -m "Configure Jenkins CI/CD pipeline"
git push origin main
```

---

## Step 2: Copy Setup Script to EC2

```powershell
# Copy the setup script to EC2
scp -i F://downloads/devops.pem EC2_JENKINS_SETUP.sh ec2-user@16.171.23.187:~
```

---

## Step 3: SSH into EC2 and Run Setup

```powershell
# Connect to EC2
ssh -i F://downloads/devops.pem ec2-user@16.171.23.187
```

Once connected to EC2, run:

```bash
# Make script executable
chmod +x EC2_JENKINS_SETUP.sh

# Run the setup script
./EC2_JENKINS_SETUP.sh
```

**Wait for installation to complete (5-10 minutes)**

When finished, you'll see the Jenkins initial admin password. **Copy this password!**

---

## Step 4: Log Out and Back In

This is required for Docker permissions:

```bash
exit
```

Then reconnect:

```powershell
ssh -i F://downloads/devops.pem ec2-user@16.171.23.187
```

---

## Step 5: Configure AWS Security Group

Go to **AWS Console** → **EC2** → **Security Groups**

Add these **Inbound Rules**:

| Port | Source | Description |
|------|--------|-------------|
| 22 | Your IP | SSH |
| 8080 | 0.0.0.0/0 | Jenkins |
| 5000 | 0.0.0.0/0 | Application |

---

## Step 6: Access Jenkins

1. Open browser: **`http://16.171.23.187:8080`**

2. Paste the initial admin password you copied earlier

3. Click **"Install suggested plugins"** and wait

4. Create admin user:
   - Username: `admin`
   - Password: (your choice)
   - Email: (your email)

5. Click **"Save and Continue"** → **"Start using Jenkins"**

---

## Step 7: Create Pipeline Job

In Jenkins:

1. Click **"New Item"**
2. Name: `job-portal-pipeline`
3. Type: **"Pipeline"**
4. Click **"OK"**

**Configure:**

- ✅ Check **"GitHub project"**
  - URL: `https://github.com/khuramshahz/job-portal-app/`

- ✅ Check **"GitHub hook trigger for GITScm polling"**

- **Pipeline** section:
  - Definition: **"Pipeline script from SCM"**
  - SCM: **"Git"**
  - Repository URL: `https://github.com/khuramshahz/job-portal-app.git`
  - Branch: `*/main`
  - Script Path: `Jenkinsfile`

Click **"Save"**

---

## Step 8: Configure GitHub Webhook

1. Go to: **`https://github.com/khuramshahz/job-portal-app/settings/hooks`**

2. Click **"Add webhook"**

3. Configure:
   - **Payload URL**: `http://16.171.23.187:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: "Just the push event"

4. Click **"Add webhook"**

---

## Step 9: Test the Pipeline

### First Build (Manual)

In Jenkins:
1. Go to `job-portal-pipeline`
2. Click **"Build Now"**
3. Watch the **"Console Output"**

Expected stages:
- ✅ Checkout Code
- ✅ Build Frontend
- ✅ Build Containers
- ✅ Verify Containers

### Verify Application

Open: **`http://16.171.23.187:5000`**

You should see your Job Portal website! 🎉

---

## Step 10: Test Automatic Trigger

On your **local machine**:

```powershell
cd "F:\7th semester\devops\website"

# Make a small change
echo "# Test" >> README.md

# Commit and push
git add README.md
git commit -m "Test automatic deployment"
git push origin main
```

**Jenkins should automatically start a new build!**

Check Jenkins dashboard to see the build in progress.

---

## Verify Everything Works

### On EC2:

```bash
# Check running containers
docker-compose ps

# Should show:
# job-portal-web    running   5000/tcp
# job-portal-mongo  running   27017/tcp
```

### In Browser:

- Jenkins: `http://16.171.23.187:8080`
- Application: `http://16.171.23.187:5000`

---

## Your Workflow Moving Forward

1. **Develop** on local machine
2. **Push** to GitHub:
   ```powershell
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
3. **Jenkins** automatically deploys
4. **App** is live at `http://16.171.23.187:5000`

---

## Troubleshooting

### Jenkins Not Starting Build

**Check:**
- GitHub webhook shows green checkmark
- Jenkins job has "GitHub hook trigger" enabled
- Port 8080 is open in Security Group

**Fix:**
```bash
# On EC2
sudo systemctl restart jenkins
```

### Application Not Accessible

**Check containers:**
```bash
docker-compose ps
docker-compose logs web
```

**Restart if needed:**
```bash
docker-compose down
docker-compose up -d
```

### Permission Errors

```bash
# On EC2
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
exit
# SSH back in
```

---

## Need More Help?

See the detailed guide: **`JENKINS_CONFIGURATION.md`**

---

## Summary

✅ Jenkins installed on EC2  
✅ Pipeline configured to pull from GitHub  
✅ Webhook triggers automatic builds  
✅ Application deploys via Docker Compose  
✅ Website accessible at `http://16.171.23.187:5000`  

**Initial State**: Website is DOWN  
**After Push**: Jenkins automatically brings it UP  

Done! 🚀
