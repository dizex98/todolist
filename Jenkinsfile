pipeline {
    agent any
    // tools {
    //     maven "maven-3.6.2"
    // }
    
    environment {
        new_tag = "2.1.${env.BUILD_ID}"        
    }
    //comment
    stages {        
        stage('Checkout')
        {
            steps {
                echo "Checkout stage for clearing dir"
                deleteDir()
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "On Build stage...."
                sh '''docker build -t todolist .'''            
                sh '''docker run --name todolist -p 5000:5000 -d todolist'''
            }
        }
        stage('Test') {
            steps {
                echo "On Test stage...."
                // need to execute it not hardcoded.
                sleep 3
                script {
                    env.GATEWAY = sh( 
                        script: "docker inspect todolist | grep \"Gateway\" | tail -n1 | cut -d '\"' -f4",returnStdout: true
                        ).trim()
                    // sh '''curl ${env.gateway}:5000'''
                    echo "gateway: ${env.GATEWAY}"
                }
            }
        }
        stage('Package') {
            steps {
                echo "On Package stage...."
            }
        }

        stage('End-to-End Test') {
            when {
                anyOf {
                    branch pattern: "feature/*"
                    branch pattern: "master"
                }
            }
            // steps {
            //     echo "E2E Test...."
            //     sh ( "curl -u jenkins:password http://artifactory:8081/artifactory/libs-snapshot-local/com/lidar/simulator/99-SNAPSHOT/simulator-99-20220502.122521-1.jar -o simulator.jar" )
            //     sh ( "curl -u jenkins:password http://artifactory:8081/artifactory/libs-snapshot-local/com/lidar/telemetry/99-SNAPSHOT/telemetry-99-20220502.132402-4.jar -o telemetry.jar")
            //     sh ( "cp target/analytics-99-SNAPSHOT.jar . ")
            //     sh ( "cp ../tests.txt tests.txt")
            //     sh ( "ls -la")
            //     echo "running tests"
            //     sh ( "java -cp simulator.jar:telemetry.jar:analytics-99-SNAPSHOT.jar com.lidar.simulation.Simulator")
            // }
            steps {
                echo "On E2E stage...."
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
            // steps{
            //     sh "mvn versions:set -DnewVersion=${new_tag}" 
            //     sh "mvn dependency:list"
            //     sh "mvn deploy -DskipTests"
            // }
            steps {
                echo "On Publish stage...."
            }
        }

    }
    post {
        always {
            // One or more steps need to be included within each condition's block.
            sh '''docker kill todolist && docker rm -f todolist'''
            sh '''docker image rm -f todolist'''
        }
    }
}