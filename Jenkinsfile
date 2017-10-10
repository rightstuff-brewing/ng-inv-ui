def projectName = 'rightstuff-176212';
def builderImageName = "gcr.io/${projectName}/jenkins-slave:node.master";
def baseImageTag = "gcr.io/${projectName}/inv-ui:${env.BRANCH_NAME.replace("/", "-")}"
def imageTag = "${baseImageTag}.${env.BUILD_NUMBER}"

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
                            sh 'yarn ng test --browsers "PhantomJS" --single-run --no-progress --code-coverage'
                        },
                        'Chrome': {
                            sh 'yarn ng test --browsers "ChromeHeadless" --single-run --no-progress --code-coverage'
                        },
                        'Firefox': {
                            sh 'yarn ng test --browsers "FirefoxHeadless" --single-run --no-progress --code-coverage'
                        }
                    )
                    junit 'reports/**/TESTS-*.xml'
                    step([$class: 'CoberturaPublisher',
                        autoUpdateHealth: false,
                        autoUpdateStability: false,
                        coberturaReportFile: 'reports/cobertura.xml',
                        failUnhealthy: false,
                        failUnstable: false,
                        maxNumberOfBuilds: 0,
                        onlyStable: false,
                        sourceEncoding: 'ASCII',
                        zoomCoverageChart: false])
                }

                stage('Publish') {
                    sh "docker build -t ${imageTag} ."
                    sh "gcloud docker -- push ${imageTag}"
                }
            }
        }
    }
}