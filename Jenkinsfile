pipeline {
    agent {
        kubernetes {
            cloud 'local cluster'
            label 'node-k8s'
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
        }
    }
    stages {
        stage('Install dependencies') {
            sh 'npm install'
        }

        stage('Build') {
            sh 'npm run build'
        }

        stage('Test') {
            sh 'npm run test'
        }
    }
}