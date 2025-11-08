pipeline {
    agent any

    environment {
        // GitHub repository URL
        REPO_URL = 'https://github.com/khuramshahz/job-portal-app.git'
        APP_DIR = 'my-webapp'
    }

    triggers {
        // Poll SCM every 2 minutes to check for changes (more reliable than webhook)
        pollSCM('H/2 * * * *')
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo '🔄 Cloning source code from GitHub...'
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Build Containers') {
            steps {
                echo '🐳 Building Docker containers using docker-compose...'
                script {
                    sh '''
                        # Use docker-compose.jenkins.yml if it exists, otherwise use docker-compose.yml
                        if [ -f docker-compose.jenkins.yml ]; then
                            docker-compose -f docker-compose.jenkins.yml down || true
                            docker-compose -f docker-compose.jenkins.yml up -d --build
                        else
                            docker-compose down || true
                            docker-compose up -d --build
                        fi
                    '''
                }
            }
        }

        stage('Verify Containers') {
            steps {
                echo '✅ Checking running containers...'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo '🎉 Build successful! Web application is running inside Docker.'
        }
        failure {
            echo '❌ Build failed. Check Jenkins console logs for details.'
        }
    }
}

