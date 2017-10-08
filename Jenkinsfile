def projectName = 'rightstuff-176212';
def builderImageName = "gcr.io/${projectName}/jenkins-slave:node.master";

podTemplate(cloud: 'local cluster', label: 'node-k8s', 
    containers: [containerTemplate(name: 'node', image: builderImageName, ttyEnabled: true, command: 'cat', alwaysPullImage: true)],
    volumes: [
            hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock'),
    ]
) {
    node('node-k8s') {
        checkout scm

        ansiColor('xterm') {
            stage('Install dependencies') {
                sh 'npm intall'
            }

            stage('Build') {
                sh 'npm run build'
            }
        }
    }
}