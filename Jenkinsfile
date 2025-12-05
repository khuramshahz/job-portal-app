pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
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
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} down || true'
            }
        }

        stage('Build and Start Containers') {
            steps {
                echo '🐳 Building and starting Docker containers...'
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo '✅ Verifying containers are running...'
                sh 'sleep 10'
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} ps'
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment successful! Application is now running at http://16.171.23.187:5000'
        }
        failure {
            echo '❌ Deployment failed. Check logs:'
            sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} logs --tail=100'
        }
    }
}

