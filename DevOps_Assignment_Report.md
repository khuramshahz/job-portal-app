# COMSATS UNIVERSITY, ISLAMABAD
## Department of Computer Science
### Assignment - 1, Fall 2025

**Course:** CSC483 – Topics in Computer Science II (DevOps)  
**Class:** BCS-7/ BDS-7  
**Total Marks:** 10  
**Submission Deadline:** October 9, 2025

---

# Cloud Computing Deployment Report
## Job Portal Application Deployment on AWS

**Student Name:** [Your Name]  
**Registration Number:** [Your Registration Number]  
**Date:** [Current Date]

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Application Overview](#application-overview)
3. [Part I: IaaS Deployment using Amazon EC2](#part-i-iaas-deployment-using-amazon-ec2)
4. [Part II: PaaS Deployment using AWS Elastic Beanstalk](#part-ii-paas-deployment-using-aws-elastic-beanstalk)
5. [Service Models Analysis](#service-models-analysis)
6. [Challenges and Solutions](#challenges-and-solutions)
7. [Conclusion](#conclusion)
8. [References](#references)

---

## Executive Summary

This report documents the successful deployment of a Job Portal web application on Amazon Web Services (AWS) using both Infrastructure as a Service (IaaS) and Platform as a Service (PaaS) models. The application was deployed using Amazon EC2 for IaaS implementation and AWS Elastic Beanstalk for PaaS implementation, demonstrating the practical application of cloud computing service models.

**Key Achievements:**
- Successfully deployed a full-stack web application on AWS EC2
- Implemented PaaS deployment using AWS Elastic Beanstalk
- Configured MongoDB Atlas as the database service
- Demonstrated understanding of cloud service models (IaaS, PaaS, SaaS)

---

## Application Overview

### Application Description
The Job Portal is a comprehensive web application built with modern technologies that allows job seekers to browse and apply for jobs, while enabling employers to post job listings and manage applications.

### Technology Stack
- **Frontend:** React.js with Vite build tool
- **Backend:** Node.js with Express.js framework
- **Database:** MongoDB Atlas (Cloud Database)
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer for resume uploads
- **Styling:** Material-UI components

### Application Features
1. **User Authentication System**
   - User registration and login
   - Role-based access (Applicant/Employer)
   - JWT-based session management

2. **Job Management**
   - Job posting and browsing
   - Advanced filtering and search
   - Job application system
   - Resume upload functionality

3. **User Dashboard**
   - Applicant dashboard for job applications
   - Employer dashboard for job management
   - Application tracking system

4. **Additional Features**
   - Responsive design
   - Career resources section
   - Interview tips and guidance
   - Resume builder tool

### Database Schema
The application uses MongoDB with the following collections:
- **Users:** Store user information and authentication data
- **Jobs:** Store job postings with details
- **Applications:** Track job applications and resumes

---

## Part I: IaaS Deployment using Amazon EC2

### 1.1 EC2 Instance Creation

**Step 1: Launch EC2 Instance**
- Navigated to AWS EC2 Console
- Selected Amazon Linux 2023 AMI
- Chose t2.micro instance type (eligible for free tier)
- Configured security group with necessary ports

*[Screenshot Space: EC2 Instance Launch Configuration]*

**Step 2: Security Group Configuration**
- **SSH (Port 22):** For secure shell access
- **HTTP (Port 80):** For web traffic
- **HTTPS (Port 443):** For secure web traffic
- **Custom Port 5000:** For Node.js application

*[Screenshot Space: Security Group Rules Configuration]*

**Step 3: Key Pair Generation**
- Generated new key pair: `devcompute.pem`
- Downloaded and secured the private key
- Set appropriate permissions (chmod 400)

*[Screenshot Space: Key Pair Creation]*

### 1.2 Server Configuration and Setup

**Step 1: SSH Connection**
```bash
ssh -i "devcompute.pem" ec2-user@ec2-54-234-43-97.compute-1.amazonaws.com
```

*[Screenshot Space: SSH Connection Success]*

**Step 2: System Updates and Package Installation**
```bash
sudo yum update -y
sudo yum install -y nodejs npm git
```

*[Screenshot Space: Package Installation]*

**Step 3: MongoDB Installation**
```bash
# Added MongoDB repository
echo "[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2023/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc" | sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo

sudo yum install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

*[Screenshot Space: MongoDB Installation and Status]*

### 1.3 Application Deployment

**Step 1: Code Upload**
- Created deployment package with frontend build
- Uploaded using SCP command:
```bash
scp -i "devcompute.pem" deployment-v3.zip ec2-user@ec2-54-234-43-97.compute-1.amazonaws.com:~/
```

*[Screenshot Space: File Upload Process]*

**Step 2: Application Setup**
```bash
# Extract and setup application
unzip deployment-v3.zip
mv server-deploy-v3 job-portal-app
cd job-portal-app
npm install
```

*[Screenshot Space: Application Setup]*

**Step 3: Environment Configuration**
Created `.env` file with MongoDB Atlas connection:
```
PORT=5000
MONGO_URI=mongodb+srv://k1h2u3t4_db_user:ZQYsIasDhNzB3cEw@job-application.zhgvpg1.mongodb.net/job-application?retryWrites=true&w=majority&appName=job-application
JWT_SECRET=your_jwt_secret_key_here
```

*[Screenshot Space: Environment Configuration]*

**Step 4: Application Launch**
```bash
npm start
```

*[Screenshot Space: Application Running Successfully]*

### 1.4 Testing and Verification

**Backend API Testing:**
```bash
curl http://localhost:5000/api/jobs
```

**Frontend Access:**
- URL: `http://ec2-54-234-43-97.compute-1.amazonaws.com:5000`
- Verified all pages load correctly
- Tested user registration and login functionality

*[Screenshot Space: Application Homepage]*
*[Screenshot Space: Job Listings Page]*
*[Screenshot Space: User Registration]*

---

## Part II: PaaS Deployment using AWS Elastic Beanstalk

### 2.1 Elastic Beanstalk Environment Setup

**Step 1: Create Application**
- Navigated to AWS Elastic Beanstalk Console
- Created new application: "Job Portal Application"
- Selected Node.js platform

*[Screenshot Space: Elastic Beanstalk Application Creation]*

**Step 2: Environment Configuration**
- **Environment Name:** job-portal-env
- **Domain:** job-portal-env.eba-sgimqti9.us-east-1.elasticbeanstalk.com
- **Platform:** Node.js 18
- **Instance Type:** t3.micro

*[Screenshot Space: Environment Configuration]*

### 2.2 Application Deployment

**Step 1: Prepare Deployment Package**
- Created `package.json` with start script
- Included `Procfile` for process management
- Zipped application files

**Step 2: Deploy to Elastic Beanstalk**
- Uploaded deployment package
- Elastic Beanstalk automatically handled:
  - Environment provisioning
  - Load balancer configuration
  - Auto-scaling setup
  - Health monitoring

*[Screenshot Space: Deployment Process]*

### 2.3 Database Integration

**MongoDB Atlas Configuration:**
- Used existing MongoDB Atlas cluster
- Updated connection string in environment variables
- Verified database connectivity

*[Screenshot Space: Database Connection Verification]*

### 2.4 Testing and Verification

**Application URLs:**
- **Frontend:** `http://jobs-env.eba-sgimqti9.us-east-1.elasticbeanstalk.com`
- **Backend API:** `http://jobs-env.eba-sgimqti9.us-east-1.elasticbeanstalk.com:5000/api/jobs`

*[Screenshot Space: Elastic Beanstalk Dashboard]*
*[Screenshot Space: Application Health Status]*
*[Screenshot Space: Live Application on Elastic Beanstalk]*

---

## Service Models Analysis

### Infrastructure as a Service (IaaS) - EC2 Implementation

**Characteristics Demonstrated:**
- **Virtual Machine Management:** Created and configured EC2 instances
- **Operating System Control:** Full control over Amazon Linux 2023
- **Network Configuration:** Custom security groups and port management
- **Storage Management:** EBS volumes for persistent storage
- **Manual Configuration:** Installed and configured all software components

**Advantages:**
- Complete control over the environment
- Cost-effective for long-running applications
- Flexibility in software stack selection
- Direct access to underlying infrastructure

**Challenges:**
- Requires manual configuration and maintenance
- Security responsibilities on the user
- Time-consuming setup process

### Platform as a Service (PaaS) - Elastic Beanstalk Implementation

**Characteristics Demonstrated:**
- **Automated Deployment:** One-click application deployment
- **Managed Infrastructure:** AWS handles underlying infrastructure
- **Auto-scaling:** Automatic scaling based on demand
- **Load Balancing:** Built-in load balancer configuration
- **Health Monitoring:** Automated health checks and monitoring

**Advantages:**
- Rapid deployment and scaling
- Reduced operational overhead
- Built-in monitoring and logging
- Automatic updates and patches

**Challenges:**
- Less control over underlying infrastructure
- Platform-specific limitations
- Potential vendor lock-in

### Software as a Service (SaaS) - MongoDB Atlas

**Characteristics Demonstrated:**
- **Managed Database Service:** Fully managed MongoDB cluster
- **Automatic Backups:** Built-in backup and recovery
- **Global Distribution:** Multi-region deployment
- **Security:** Built-in encryption and access controls

**Benefits:**
- Zero database administration
- High availability and reliability
- Automatic scaling
- Professional support

---

## Challenges and Solutions

### Challenge 1: Module Compatibility Issues
**Problem:** Node.js module resolution errors during deployment
**Solution:** 
- Removed and reinstalled node_modules
- Used compatible package versions
- Implemented proper dependency management

### Challenge 2: Frontend-Backend Communication
**Problem:** Frontend trying to connect to localhost instead of server
**Solution:**
- Created environment-specific build configuration
- Used Vite environment variables for API URL
- Rebuilt frontend with correct server endpoints

### Challenge 3: Database Connection
**Problem:** Local MongoDB vs Cloud MongoDB configuration
**Solution:**
- Migrated to MongoDB Atlas for cloud deployment
- Updated connection strings and environment variables
- Implemented proper error handling for database connections

### Challenge 4: Security Group Configuration
**Problem:** Application not accessible from external networks
**Solution:**
- Configured proper security group rules
- Opened necessary ports (80, 443, 5000)
- Implemented proper firewall rules

---

## Conclusion

This assignment successfully demonstrated the practical implementation of cloud computing service models through the deployment of a Job Portal application on AWS. The project achieved the following objectives:

### Key Learnings:
1. **IaaS Implementation:** Gained hands-on experience with Amazon EC2, understanding virtual machine management, security configuration, and manual application deployment.

2. **PaaS Implementation:** Experienced the benefits of AWS Elastic Beanstalk, including automated deployment, managed infrastructure, and simplified scaling.

3. **Service Model Comparison:** Understood the trade-offs between different cloud service models in terms of control, management overhead, and deployment complexity.

4. **Cloud Best Practices:** Implemented proper security configurations, environment management, and monitoring practices.

### Technical Achievements:
- Successfully deployed a full-stack web application on both IaaS and PaaS platforms
- Integrated cloud database services (MongoDB Atlas)
- Implemented proper security configurations
- Demonstrated understanding of cloud networking and access control

### Application URLs:
- **EC2 Deployment (IaaS):** `http://ec2-54-234-43-97.compute-1.amazonaws.com:5000`
- **Elastic Beanstalk Deployment (PaaS):** `http://jobs-env.eba-sgimqti9.us-east-1.elasticbeanstalk.com`

The deployment demonstrates proficiency in cloud computing fundamentals and provides a solid foundation for understanding modern DevOps practices and cloud-native application development.

---

## References

1. Amazon Web Services Documentation. (2025). Amazon EC2 User Guide. Retrieved from https://docs.aws.amazon.com/ec2/
2. Amazon Web Services Documentation. (2025). AWS Elastic Beanstalk Developer Guide. Retrieved from https://docs.aws.amazon.com/elasticbeanstalk/
3. MongoDB Atlas Documentation. (2025). MongoDB Atlas User Guide. Retrieved from https://docs.atlas.mongodb.com/
4. Node.js Documentation. (2025). Node.js Official Documentation. Retrieved from https://nodejs.org/docs/
5. React Documentation. (2025). React Official Documentation. Retrieved from https://reactjs.org/docs/

---

**Report Prepared By:** [Your Name]  
**Date:** [Current Date]  
**Course:** CSC483 – Topics in Computer Science II (DevOps)  
**Institution:** COMSATS University, Islamabad

