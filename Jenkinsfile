pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/khuramshahz/job-portal-app.git'
        DOCKER_COMPOSE_FILE = 'docker-compose.jenkins.yml'
    }

    triggers {
        // Trigger automatically via GitHub webhook on code push
        githubPush()
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '🔄 Source code checked out automatically by Jenkins.'
                sh 'ls -la'
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
                echo '🐳 Building web application in containerized environment using Docker...'
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
                echo '✅ Verifying running containers...'
                script {
                    sh '''
                        sleep 10
                        docker-compose -f ${DOCKER_COMPOSE_FILE} ps
                        docker ps --filter "name=jenkins-job-portal" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '🎉 Build successful! Web application is running inside Docker containers.'
            script {
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} ps'
            }
        }
        failure {
            echo '❌ Build failed. Check Jenkins console logs for details.'
            script {
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} logs --tail=50'
            }
        }
        always {
            echo 'Pipeline execution completed.'
        }
    }
}
