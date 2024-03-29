pipeline {
    agent any
    
    environment {
        repository = "644435390668.dkr.ecr.eu-central-1.amazonaws.com"
        app_image = "todolist-itay-app"
        mongo_image = "todolist-itay-mongo"
        //tag = "latest"
    }
    stages {        

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
                echo "E2E stage...."
                sleep 1
                script {
                    env.CONTAINER_NAME=sh(script:"docker ps | grep frontend | rev | cut -d ' ' -f1 | rev",returnStdout: true).trim()
                    env.DOMAIN="${env.CONTAINER_NAME}/tasks"
                }
                sh """
                    curl -X POST -F 'emp_id=20' -F 'desc="POST from jenkins"' -F 'due_date="01/01/2040"' ${env.DOMAIN}
                    curl ${env.DOMAIN}
                    echo "POST from jenkins has been succeeded..."
                    sleep 2
                    curl -X POST -F 'update_task_id=999' -F 'update_desc="PUT from jenkins"' ${env.DOMAIN}
                    curl ${env.DOMAIN}
                    echo "PUT from jenkins has been succeeded..."
                    sleep 2
                    curl -X POST -F 'del_task_id=999' ${env.DOMAIN}
                    curl ${env.DOMAIN}
                    echo "DELETE from jenkins has been succeeded..."
                    sleep 2
                    """
            }
        }

        stage("Tag"){
            when {
                branch pattern: 'master'
            }
            steps {
                script{
                    try{
                        current_version=sh(script: "git tag | tail -n 1 | grep 'v.*' | grep -Eo '[0-9]{1,24}'", returnStdout: true).trim()
                    }
                    catch (Exception e){
                        current_version='0'
                    }
                    env.new_version=plusOne(current_version)
                    withCredentials([sshUserPrivateKey(credentialsId: 'github', keyFileVariable: 'tempfile', usernameVariable: 'jenkins')]) {
                        sh "git tag v.${new_version} && git push origin --tags"
                    }
                }
            }
        }
        stage('Publish') {
            when {
                branch pattern: 'master'
            }
            steps {
                echo "On Publish stage...."
                withCredentials([aws(credentialsId:'aws-cred',accessKeyVariable:'AWS_ACCESS_KEY_ID',secretKeyVariable:'AWS_SECRET_ACCESS_KEY')]) {
                    sh """
                        aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin ${env.repository}
                        docker tag todolist_master_backend ${env.repository}/${env.app_image}:${env.new_version}
                        docker push ${env.repository}/${env.app_image}:${env.new_version}
                    """
                }
            }
        }
    }
    post {
        always {
            sh '''docker-compose down -v'''
            sh """docker image rm ${env.repository}/${env.app_image}:${env.new_version}"""
        }
    }
}
int plusOne(String version){
    int new_version=Integer.parseInt(version)+1
    return new_version
}