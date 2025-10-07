pipeline {
    agent any

    environment {
        APP_NAME = "jokes-app"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Check Base Image') {
            steps {
                script {
                    echo "Checking Dockerfile for secure base images"
                    def dockerfile = readFile('Dockerfile')
                    def fromLines = dockerfile.readLines().find { it.trim().startsWith('FROM') } // Get the used images

                    if (fromLines == null) {
                        error("Error: No Docker Images found in the Dockerfile.")
                    }

                    def invalidImages = []

                    formLines.each { line ->
                        def image = line.tokenize(' ')[1]
                        echo "Detected base image: ${image}"

                        if (!image.startsWith('cgr.dev/chainguard')) {
                            invalidImages.add(image)
                        }

                    }
                    if (invalidImages != []) {
                        error("Error: Insecure base images detected: ${invalidImages.join(', ')}. Please use Chainguard base images.")
                    }

                    echo "Dockerfile validated: using secure Chainguard base images"
                }
            }
        }

        stage('Build Container') {
            steps {
                script {
                    echo "Building Docker image ${APP_NAME}:${IMAGE_TAG}"
                    sh "docker build -t ${APP_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Replace Running Container') {
            steps {
                script {
                    echo "Replacing existing container with newer version"
                    // Stop and remove old container if exists
                    sh """
                    if [ \$(docker ps -q -f name=${APP_NAME}) ]; then
                        docker stop ${APP_NAME}
                        docker rm ${APP_NAME}
                    fi
                    """
                    // Start new container
                    sh "docker run -d --name ${APP_NAME} -p 8080:8080 ${APP_NAME}:${IMAGE_TAG}"
                    echo "🚀 Deployment successful: ${APP_NAME}:${IMAGE_TAG} is running."
                }
            }
        }
    }

    post {
        failure {
            echo "Pipeline failed: App deployment stoped."
        }
        success {
            echo "Pipeline completed successfully: Container has been deployed."
        }
    }
}
