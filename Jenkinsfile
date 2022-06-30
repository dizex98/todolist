pipeline {
    agent any
    
    environment {
        repository = "644435390668.dkr.ecr.eu-central-1.amazonaws.com"
        app_image = "todolist-itay-app"
        mongo_image = "todolist-itay-mongo"
        tag = "latest"
    }
    stages {        
    //     stage('Checkout')
    //     {
    //         steps {
    //             echo "Checkout stage for clearing dir"
    //             deleteDir()
    //             checkout([
    //                 $class: 'GitSCM',
    //                 branches: scm.branches,
    //                 doGenerateSubmoduleConfigurations: scm.doGenerateSubmoduleConfigurations,
    //                 extensions: [[$class: 'CloneOption', noTags: false, shallow: false, depth: 0, reference: '']],
    //                 userRemoteConfigs: scm.userRemoteConfigs,
    //             ])
    //             sh """git tag"""
    //             script {
    //                 message=sh(script:"git tag",returnStdout: true)
    //                 echo "${message}"
    //             } 
    //         }
    //     }

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