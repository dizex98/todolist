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
                // script {
                //     message=sh(script:"git tag").trim()
                //     echo "${message}"
                // } 
            }
        }

        stage('Build') {
            steps {
                echo "On Build stage...."
                sh '''docker-compose up --build -d'''            
            }
        }
        stage('Test') {
            steps {
                echo "On Test stage...."
                sleep 3
                script {
                    env.CONTAINER_NAME=sh(script:"docker ps | grep backend | rev | cut -d ' ' -f1 | rev",returnStdout: true)
                    env.PORT="5000"
                    sh """curl ${env.CONTAINER_NAME}:5000"""
                }
            }
        }
        stage('Package') {
            steps {
                echo "On Package stage...."
                script {
                    sh '''docker tag todolist $image_name:$tag'''
                    sh '''docker images'''
                }
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
                echo "On E2E stage...."
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
                sh "gcloud container clusters get-credentials todolist --zone europe-west9-c --project portfolio-todolist-352710"
            }
        }

    }
    post {
        always {
            sh '''docker-compose down'''
        }
    }
}