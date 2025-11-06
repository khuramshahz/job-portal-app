pipeline {
    agent any
    
    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.jenkins.yml'
    }
    
    // Automatic trigger: Build on push to GitHub
    triggers {
        // Poll SCM every minute to check for changes
        pollSCM('H/5 * * * *')
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/khuramshahz/job-portal-app.git'
            }
        }
        
        stage('Build Frontend') {
            steps {
                echo 'Building React frontend...'
                script {
                    sh '''
                        cd client
                        npm install
                        VITE_API_URL= npm run build
                        cd ..
                    '''
                }
            }
        }
        
        stage('Stop Previous Containers') {
            steps {
                echo 'Stopping previous containers...'
                sh '''
                    docker-compose -f ${DOCKER_COMPOSE_FILE} down || true
                '''
            }
        }
        
        stage('Build and Run with Docker Compose') {
            steps {
                echo 'Building and starting containers with docker-compose...'
                sh '''
                    docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build
                '''
            }
        }
        
        stage('Wait for Services') {
            steps {
                echo 'Waiting for services to be ready...'
                sh '''
                    sleep 15
                    docker-compose -f ${DOCKER_COMPOSE_FILE} ps
                '''
            }
        }
        
        stage('Test Application') {
            steps {
                echo 'Testing application...'
                sh '''
                    sleep 5
                    curl -f http://localhost:8081/api/jobs || exit 1
                    echo "Application is running successfully!"
                '''
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline completed. Showing container status:'
            sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} ps'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
            sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} logs'
        }
    }
}

