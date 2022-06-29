pipeline {
    agent any
    
    environment {
        // new_tag = "2.1.${env.BUILD_ID}"
        image_name = "gcr.io/portfolio-todolist-352710/todolist"
        tag = "latest"
    }
    stages {        
        stage('Checkout')
        {
            steps {
                echo "Checkout stage for clearing dir"
                deleteDir()
                checkout([
                    $class: 'GitSCM',
                    branches: scm.branches,
                    doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
                    extensions: [[$class: 'CloneOption', noTags: false, shallow: false, depth: 0, reference: '']],
                    userRemoteConfigs: scm.userRemoteConfigs,
                ])
                script {
                    message=sh(script:"git tag",returnStdout: true).trim()
                    echo "${message}"
                } 
            }
        }

        stage('Build and Package') {
            steps {
                echo "On Build stage...."
                sh '''docker-compose up --build -d'''            
            }
        }
        stage('End-to-End Test') {
            when {
                anyOf {
                    branch pattern: "feature/*"
                    branch pattern: "master"
                }
            }
            steps {
                echo "On Test stage...."
                sleep 3
                script {
                    env.CONTAINER_NAME=sh(script:"docker ps | grep frontend | rev | cut -d ' ' -f1 | rev",returnStdout: true)
                }
                echo "${env.CONTAINER_NAME}"
                sh """curl ${env.CONTAINER_NAME}"""
            }
        }

        stage("Tag"){
            when {
                branch pattern: 'master'
            }
            steps {
                echo "On tag stage...."
            }
        }

        stage('Publish') {
            when {
                branch pattern: 'master'
            }
            steps {
                echo "On Publish stage...."
            }
        }

    }
    post {
        always {
            sh '''docker-compose down'''
        }
    }
}