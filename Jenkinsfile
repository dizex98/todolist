pipeline {
    agent any
    // tools {
    //     maven "maven-3.6.2"
    // }
    
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
                    message=sh(script:"git tag").trim()
                    echo "${message}"
                } 
            }
        }

        stage('Build') {
            steps {
                echo "On Build stage...."
                sh '''docker-compose up --build -d'''            
                // sh '''docker run --name todolist -p 4000:5000 -d todolist'''
            }
        }
        stage('Test') {
            steps {
                echo "On Test stage...."
                // need to execute it not hardcoded.
                // sleep 100
                sh '''curl '''
                //getting null variable, check this later
                // script {
                //     env.GATEWAY = sh( 
                //         script: "docker inspect todolist | grep \"Gateway\" | tail -n 1 | cut -d '\"' -f4",returnStdout: true
                //         ).trim()
                //     // sh '''curl ${env.gateway}:5000'''
                //     echo "gateway: ${env.GATEWAY}"
                // }
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
                // sh '''docker-compose up --build -d'''
                // sleep 20
                // sh '''docker-compose down'''
            }
        }

        stage("Tag"){
            when {
                branch pattern: 'master'
            }
            // steps{
            //     git branch: env.BRANCH_NAME, credentialsId: 'gitlab', url: "git@gitlab:developer/analytics.git"
            //     sh "git tag ${new_tag} && git push --tag"
            // }
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