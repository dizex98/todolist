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
                sh """curl ${env.CONTAINER_NAME}"""
            }
        }

        stage("Tag"){
            when {
                branch pattern: 'master'
            }
            steps {
                script{
                    try{
                        sh """git tag"""
                        current_version=sh(script: "git tag | tail -n 1 | grep 'v.*' | grep -Eo '[0-9]{1,24}'", returnStdout: true).trim()
                        echo "current version=${current_version}"
                    }
                    catch (Exception e){
                        current_version='0'
                    }
                    //git branch: env.GIT_BRANCH, credentialsId: 'github', url: 'git@github.com:dizex98/todolist.git'
                    env.new_version=plusOne(current_version)
                    echo "new_version=${env.new_version}"
                    // sh "git config --global user.email 'jenkins@example.com'"
                    // sh "git config --global user.name 'jenkins'"
                    sh "git clean -f && git reset && git commit --allow-empty -m 'releasing v.${new_version}'"
                    sh "git tag v.${new_version}"
                    sh "git tag && git push origin master --tags"
                }
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
            sh '''docker-compose down -v'''
        }
    }
}
int plusOne(String version){
    int new_version=Integer.parseInt(version)+1
    return new_version
}