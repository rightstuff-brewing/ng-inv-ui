pipeline {
    agent {
        kubernetes {
            cloud 'local cluster'
            label 'node-k8s'
            containers [
                containerTemplate {
                    name 'node'
                    image 'gcr.io/rightstuff-176212/jenkins-slave:node.master'
                    ttyEnabled true
                    command 'cat'
                    alwaysPullImage true
                    volumes [
                        hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')
                    ]
                }
            ]
        }
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
    }
}