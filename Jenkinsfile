pipeline {
    agent any

    environment {
        // GitHub repository URL
        REPO_URL = 'https://github.com/khuramshahz/job-portal-app.git'
        APP_DIR = 'my-webapp'
    }

    triggers {
        // Trigger automatically via GitHub webhook on code push
        githubPush()
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
                    docker-compose down || true
                    docker-compose up -d --build
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

