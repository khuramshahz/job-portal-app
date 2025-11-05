# Step-by-Step Docker Deployment on EC2

## 📦 Package Created: `docker-deployment.zip`

This package contains:
- ✅ `server/` - Backend application
- ✅ `client/` - Frontend application  
- ✅ `Dockerfile` - Multi-stage build file
- ✅ `docker-compose.yml` - Container orchestration with MongoDB volume
- ✅ `.dockerignore` - Build optimization
- ✅ `ec2-docker-deploy.sh` - Automated deployment script

---

## 🚀 Deployment Steps

### Step 1: Upload Package to EC2

**Make sure your EC2 instance is running and accessible.**

```powershell
# Upload the deployment package
scp -i "F:\Downloads\devcompute.pem" docker-deployment.zip ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com:~/
```

**If you get connection timeout:**
1. Check if EC2 instance is running in AWS Console
2. Verify the IP address hasn't changed
3. Check Security Group allows SSH (port 22)

---

### Step 2: Connect to EC2

```powershell
ssh -i "F:\Downloads\devcompute.pem" ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com
```

---

### Step 3: Extract and Setup on EC2

Once connected to EC2, run:

```bash
# Create project directory
mkdir -p ~/job-portal-docker
cd ~/job-portal-docker

# Extract the deployment package
unzip ~/docker-deployment.zip -d .

# Make deployment script executable
chmod +x ec2-docker-deploy.sh
```

---

### Step 4: Run Automated Deployment Script

The script will:
- Install Docker and Docker Compose (if not installed)
- Build the Docker image
- Start containers with docker-compose
- Configure MongoDB with persistent volume

```bash
# Run the deployment script
./ec2-docker-deploy.sh
```

**If you get permission error:**
```bash
bash ec2-docker-deploy.sh
```

---

### Step 5: If Docker Group Permission Needed

If the script asks you to logout/login:

```bash
# Logout from EC2
exit
```

Then reconnect:
```powershell
ssh -i "F:\Downloads\devcompute.pem" ubuntu@ec2-3-87-75-23.compute-1.amazonaws.com
```

And run the script again:
```bash
cd ~/job-portal-docker
./ec2-docker-deploy.sh
```

---

### Step 6: Push to Docker Hub (Required for Assignment)

After building the image on EC2, push it to Docker Hub:

```bash
# Login to Docker Hub (you'll need a Docker Hub account)
docker login

# Tag the image (replace YOUR_USERNAME with your Docker Hub username)
docker tag job-portal-docker_web:latest YOUR_USERNAME/job-portal-app:latest

# Push to Docker Hub
docker push YOUR_USERNAME/job-portal-app:latest
```

**Example:**
```bash
docker tag job-portal-docker_web:latest johndoe/job-portal-app:latest
docker push johndoe/job-portal-app:latest
```

---

### Step 7: Verify Deployment

```bash
# Check running containers
docker ps

# Check volumes (should show mongo-data)
docker volume ls

# Test API
curl http://localhost:5000/api/jobs

# View logs
docker-compose logs -f
```

---

### Step 8: Update docker-compose.yml to Use Docker Hub Image

After pushing to Docker Hub, you can update docker-compose.yml:

```bash
nano docker-compose.yml
```

Change the web service to use the Docker Hub image:

```yaml
web:
  # Comment out build section
  # build:
  #   context: .
  #   dockerfile: Dockerfile
  
  # Use Docker Hub image
  image: YOUR_USERNAME/job-portal-app:latest
```

Then restart:
```bash
docker-compose down
docker-compose up -d
```

---

## 🔍 Verification Commands

```bash
# List all containers
docker ps -a

# List volumes (should show mongo-data)
docker volume ls

# Inspect MongoDB volume
docker volume inspect job-portal-docker_mongo-data

# Check MongoDB data persistence
docker exec -it job-portal-mongo mongosh --eval "db.adminCommand('listDatabases')"

# View container logs
docker logs job-portal-web
docker logs job-portal-mongo
```

---

## 📊 Expected Results

After successful deployment:

1. **Two containers running:**
   - `job-portal-web` (port 5000)
   - `job-portal-mongo` (port 27017)

2. **One volume created:**
   - `job-portal-docker_mongo-data` (persistent storage)

3. **Application accessible at:**
   - `http://YOUR_EC2_IP:5000`

---

## 🐛 Troubleshooting

### Issue: "docker: command not found"
**Solution:** The script will install Docker automatically. If it doesn't, run:
```bash
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl start docker
sudo usermod -aG docker $USER
```

### Issue: "Permission denied" when running docker
**Solution:** 
```bash
sudo usermod -aG docker $USER
# Logout and login again
exit
# Reconnect via SSH
```

### Issue: Port 5000 already in use
**Solution:**
```bash
# Find and kill process using port 5000
sudo lsof -i :5000
sudo kill -9 <PID>
# Or change port in docker-compose.yml
```

### Issue: MongoDB connection failed
**Solution:**
```bash
# Check if MongoDB container is running
docker ps | grep mongo

# Check logs
docker logs job-portal-mongo

# Restart containers
docker-compose restart
```

---

## 📸 Screenshots for Assignment

Capture these screenshots:

1. ✅ Dockerfile contents
2. ✅ docker-compose.yml showing volume configuration
3. ✅ `docker build` output
4. ✅ Docker Hub repository with pushed image
5. ✅ `docker ps` showing running containers
6. ✅ `docker volume ls` showing mongo-data volume
7. ✅ `docker volume inspect` showing volume details
8. ✅ Application running on EC2 public IP
9. ✅ MongoDB data verification (data persistence)

---

## 🌐 Access Your Application

Once deployed, access your application at:
```
http://YOUR_EC2_PUBLIC_IP:5000
```

**Example:**
```
http://3.87.75.23:5000
```

**Note:** Make sure Security Group allows inbound traffic on port 5000!

---

## ✅ Assignment Checklist

- [x] Dockerfile created
- [x] docker-compose.yml with web and MongoDB services
- [x] MongoDB volume configured for persistence
- [ ] Docker image built
- [ ] Image pushed to Docker Hub
- [ ] Application deployed on EC2
- [ ] Containers running successfully
- [ ] Volume persistence verified
- [ ] Application accessible via public IP

