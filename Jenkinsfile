pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/Ankur7891/Hello-Jenkins-Ankur22BCD46.git'
        SONARQUBE_SERVER = 'Ankur22BCD46'
        SONARQUBE_PROJECT_KEY = 'Ankur22BCD46-NodeApp'
        IMAGE_NAME = 'ankurk11/ankur22bcd46-app'
        CONTAINER_NAME = 'ankur22bcd46-container'
        REGISTRY = 'docker.io'
        SONAR_HOST_URL = 'http://localhost:9000'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies & Test') {
            steps {
                bat 'npm install'
                bat 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withCredentials([string(credentialsId: 'sonarqube', variable: 'SONAR_TOKEN')]) {
                    bat """
                    sonar-scanner.bat -D"sonar.projectKey=${SONARQUBE_PROJECT_KEY}" -D"sonar.sources=." -D"sonar.host.url=${SONAR_HOST_URL}" -D"sonar.login=%SONAR_TOKEN%"
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Registry') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat """
                    echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin ${REGISTRY}
                    docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy Container') {
            steps {
                bat "docker run -d --name ${CONTAINER_NAME} -p 8080:8080 ${IMAGE_NAME}:latest"
            }
        }
    }

    post {
        success {
            echo "Pipeline Execution Successful!"
        }
        failure {
            echo "Pipeline Failed!"
        }
    }
}
