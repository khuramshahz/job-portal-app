pipeline {
    agent any

    environment {
        // GitHub repository URL
        REPO_URL = 'https://github.com/khuramshahz/job-portal-app.git'
        DOCKER_COMPOSE_FILE = 'docker-compose.jenkins.yml'
    }

    triggers {
        // Trigger automatically on GitHub push via webhook
        githubPush()
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '🔄 Cloning source code from GitHub...'
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: "${REPO_URL}"
            }
        }

        stage('Build Frontend') {
            steps {
                echo '📦 Building React frontend...'
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

        stage('Build Containers') {
            steps {
                echo '🐳 Building Docker containers using docker-compose...'
                script {
                    sh '''
                        docker-compose -f ${DOCKER_COMPOSE_FILE} down || true
                        docker-compose -f ${DOCKER_COMPOSE_FILE} up -d --build
                    '''
                }
            }
        }

        stage('Verify Containers') {
            steps {
                echo '✅ Checking running containers...'
                sh '''
                    sleep 10
                    docker-compose -f ${DOCKER_COMPOSE_FILE} ps
                '''
            }
        }

        stage('Test Application') {
            steps {
                echo '🧪 Testing application...'
                sh '''
                    sleep 5
                    curl -f http://localhost:8081/api/jobs || exit 1
                    echo "Application is running successfully!"
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Build successful! Web application is running inside Docker.'
            sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} ps'
        }
        failure {
            echo '❌ Build failed. Check Jenkins console logs for details.'
            sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} logs'
        }
        always {
            echo 'Pipeline completed.'
        }
    }
}

