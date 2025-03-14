pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/Ankur7891/Hello-Jenkins-Ankur22BCD46.git'
        SONARQUBE_SERVER = 'Ankur22BCD46'
        SONARQUBE_PROJECT_KEY = 'Ankur22BCD46-NodeApp'
        IMAGE_NAME = 'ankurk11/ankur22bcd46-app'
        CONTAINER_NAME = 'ankur22bcd46-container'
        REGISTRY = 'docker.io'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${GIT_REPO}"
            }
        }

        stage('Install Dependencies & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv("${SONARQUBE_SERVER}") {
                    sh "sonar-scanner -Dsonar.projectKey=${SONARQUBE_PROJECT_KEY} -Dsonar.sources=."
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:latest ."
            }
        }

        stage('Push to Registry') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin ${REGISTRY}"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }

        stage('Deploy Container') {
            steps {
                sh "docker run -d --name ${CONTAINER_NAME} -p 8080:8080 ${IMAGE_NAME}:latest"
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
