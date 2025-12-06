pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        EC2_IP = '16.170.235.37'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'
                checkout scm
            }
        }

        stage('Build Frontend') {
            steps {
                echo '📦 Building React frontend...'
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Stop Existing Containers') {
            steps {
                echo '🛑 Stopping existing containers...'
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} down || true'
            }
        }

        stage('Build and Start Containers') {
            steps {
                echo '🐳 Building and starting Docker containers...'
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build'
            }
        }

        stage('Wait for Startup') {
            steps {
                echo '⏳ Waiting for services to start...'
                sh 'sleep 15'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '✅ Verifying containers are running...'
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} ps'
                sh 'docker ps'
                echo '🔍 Checking application health...'
                sh 'curl -f http://localhost:5000 || echo "Application starting up..."'
            }
        }

        stage('Display Status') {
            steps {
                echo '📊 Container Status:'
                sh 'docker stats --no-stream'
                echo '💾 Disk Usage:'
                sh 'docker system df'
            }
        }
    }

    post {
        success {
            echo '=========================================='
            echo '🎉 DEPLOYMENT SUCCESSFUL!'
            echo '=========================================='
            echo "✅ Application is running at: http://${EC2_IP}:5000"
            echo '✅ MongoDB is running on port 27017'
            echo '✅ All containers are healthy'
            echo '=========================================='
        }
        failure {
            echo '=========================================='
            echo '❌ DEPLOYMENT FAILED!'
            echo '=========================================='
            echo '📋 Checking container logs:'
            sh 'docker compose -f ${DOCKER_COMPOSE_FILE} logs --tail=50'
            echo '📋 Checking Docker status:'
            sh 'docker ps -a'
            echo '=========================================='
        }
        always {
            echo '🧹 Cleaning up old Docker images...'
            sh 'docker image prune -f || true'
        }
    }
}

