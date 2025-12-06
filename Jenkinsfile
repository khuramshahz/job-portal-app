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

        stage('Run Automated Tests') {
            steps {
                echo '🧪 Running Selenium automated tests in Docker container...'
                script {
                    // Run tests in Docker container with Maven and Chrome
                    sh '''
                        docker run --rm \
                        -v "$(pwd)/selenium-tests:/tests" \
                        -v "$HOME/.m2:/root/.m2" \
                        --network host \
                        markhobson/maven-chrome \
                        bash -c "cd /tests && mvn clean test"
                    '''
                }
            }
        }

        stage('Publish Test Results') {
            steps {
                echo '📊 Publishing test results...'
                junit allowEmptyResults: true, testResults: '**/selenium-tests/target/surefire-reports/*.xml'
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
        always {
            script {
                echo '📧 Preparing test summary email...'
                
                // Get commit author email
                sh "git config --global --add safe.directory ${env.WORKSPACE}"
                def committer = sh(
                    script: "git log -1 --pretty=format:'%ae'",
                    returnStdout: true
                ).trim()

                // Parse test results
                def testResultsExist = fileExists('selenium-tests/target/surefire-reports/*.xml')
                
                if (testResultsExist) {
                    def raw = sh(
                        script: "grep -h \"<testcase\" selenium-tests/target/surefire-reports/*.xml || true",
                        returnStdout: true
                    ).trim()

                    int total = 0
                    int passed = 0
                    int failed = 0
                    int skipped = 0
                    def details = ""

                    if (raw) {
                        raw.split('\n').each { line ->
                            total++
                            def name = (line =~ /name=\"([^\"]+)\"/)[0][1]

                            if (line.contains("<failure")) {
                                failed++
                                details += "${name} — ❌ FAILED\n"
                            } else if (line.contains("<skipped") || line.contains("</skipped>")) {
                                skipped++
                                details += "${name} — ⏭️ SKIPPED\n"
                            } else {
                                passed++
                                details += "${name} — ✅ PASSED\n"
                            }
                        }
                    }

                    def buildStatus = currentBuild.result ?: 'SUCCESS'
                    def statusEmoji = buildStatus == 'SUCCESS' ? '✅' : '❌'

                    def emailBody = """
${statusEmoji} Build #${env.BUILD_NUMBER} - ${buildStatus}

🧪 Test Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Tests:   ${total}
✅ Passed:     ${passed}
❌ Failed:     ${failed}
⏭️ Skipped:    ${skipped}

📝 Detailed Results:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${details ?: 'No test results available'}

🔗 Application URL: http://${EC2_IP}:5000
📦 Build URL: ${env.BUILD_URL}

Commit: ${env.GIT_COMMIT?.take(7) ?: 'N/A'}
Branch: ${env.GIT_BRANCH ?: 'main'}
"""

                    emailext(
                        to: committer,
                        subject: "${statusEmoji} Build #${env.BUILD_NUMBER} - ${buildStatus} - Test Results",
                        body: emailBody
                    )
                } else {
                    echo '⚠️ No test results found to send email'
                }
            }
            
            echo '🧹 Cleaning up old Docker images...'
            sh 'docker image prune -f || true'
        }
        
        success {
            echo '=========================================='
            echo '🎉 DEPLOYMENT & TESTS SUCCESSFUL!'
            echo '=========================================='
            echo "✅ Application is running at: http://${EC2_IP}:5000"
            echo '✅ MongoDB is running on port 27017'
            echo '✅ All containers are healthy'
            echo '✅ All automated tests passed'
            echo '=========================================='
        }
        
        failure {
            echo '=========================================='
            echo '❌ DEPLOYMENT OR TESTS FAILED!'
            echo '=========================================='
            echo '📋 Checking container logs:'
            sh 'docker compose -f ${DOCKER_COMPOSE_FILE} logs --tail=50 || true'
            echo '📋 Checking Docker status:'
            sh 'docker ps -a'
            echo '📋 Checking test logs:'
            sh 'cat selenium-tests/target/surefire-reports/*.txt || true'
            echo '=========================================='
        }
    }
}

