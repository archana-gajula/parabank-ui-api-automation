pipeline {
    agent any

    environment {
        PATH="/usr/local/bin:${env.PATH}"
    }
    stages {
        stage('test run') {
            steps {
                sh 'npm install'
            }
        }
    }
}