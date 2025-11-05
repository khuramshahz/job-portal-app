# Push Docker Image to Docker Hub

## Current Status
✅ Docker image built successfully: `job-portal-docker_web:latest`  
✅ Application running in containers  
✅ MongoDB volume configured for persistence  

## Push to Docker Hub

### Step 1: Login to Docker Hub

On your EC2 instance, run:

```bash
ssh -i "F:/downloads/devcompute.pem" ubuntu@ec2-3-87-92-182.compute-1.amazonaws.com
cd ~/job-portal-docker
sudo docker login
```

Enter your Docker Hub username and password when prompted.

### Step 2: Tag Your Image

Replace `YOUR_DOCKERHUB_USERNAME` with your actual Docker Hub username:

```bash
sudo docker tag job-portal-docker_web:latest YOUR_DOCKERHUB_USERNAME/job-portal-app:latest
```

**Example:**
```bash
sudo docker tag job-portal-docker_web:latest johndoe/job-portal-app:latest
```

### Step 3: Push to Docker Hub

```bash
sudo docker push YOUR_DOCKERHUB_USERNAME/job-portal-app:latest
```

**Example:**
```bash
sudo docker push johndoe/job-portal-app:latest
```

### Step 4: Verify on Docker Hub

1. Go to https://hub.docker.com
2. Login to your account
3. Navigate to your repositories
4. You should see `job-portal-app` repository with the latest tag

### Step 5: Update docker-compose.yml to Use Docker Hub Image (Optional)

After pushing, you can update `docker-compose.yml` to use the Docker Hub image instead of building locally:

```bash
nano docker-compose.yml
```

Change:
```yaml
web:
  # Comment out build section
  # build:
  #   context: .
  #   dockerfile: Dockerfile
  
  # Use Docker Hub image
  image: YOUR_DOCKERHUB_USERNAME/job-portal-app:latest
```

Then restart:
```bash
sudo docker-compose down
sudo docker-compose up -d
```

## Quick Command (All in One)

```bash
cd ~/job-portal-docker
sudo docker login
sudo docker tag job-portal-docker_web:latest YOUR_USERNAME/job-portal-app:latest
sudo docker push YOUR_USERNAME/job-portal-app:latest
```

## Notes

- Make sure you have a Docker Hub account (free at https://hub.docker.com)
- The image push may take several minutes depending on your internet connection
- The image size is approximately 500-800 MB (includes Node.js, frontend build, and backend)

