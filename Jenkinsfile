def projectName = 'rightstuff-176212';
def builderImageName = "gcr.io/${projectName}/jenkins-slave:node.master";

podTemplate(cloud: 'local cluster', label: 'node-k8s', 
    containers: [containerTemplate(name: 'node', image: builderImageName, ttyEnabled: true, command: 'cat', alwaysPullImage: true)],
    volumes: [
            hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock'),
    ]
) {
    node('node-k8s') {
        container('node') {
            checkout scm

            ansiColor('xterm') {
                stage('Install dependencies') {
                    sh 'npm install -g yarn'
                    sh 'yarn install'
                }

                stage('Lint') {
                    sh 'yarn ng lint'
                }

                stage('Build') {
                    sh 'yarn ng build --prod --aot --no-progress'
                }

                stage('Test') {
                    parallel (
                        'PhantomJS': {
                            sh 'yarn ng test --browsers "PhantomJS" --single-run --no-progress'
                        }
                        'Chrome': {
                            sh 'yarn ng test --browsers "ChromeHeadless" --single-run --no-progress'
                        },
                        'Firefox': {
                            sh 'yarn ng test --browsers "Firefox" --single-run --no-progress'
                        }
                    )
                    junit 'test_results/**/*'
                }
            }
        }
    }
}