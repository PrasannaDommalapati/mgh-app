import groovy.json.JsonOutput

def notifySlack(text, attachments) {

    def slackURL   = ''

    def payload = JsonOutput.toJson([
        text:        text,
        channel:     '#jenkins',
        attachments: attachments
    ])

    sh "curl -X POST --data-urlencode \'payload=${payload}\' ${slackURL}"
}

node('master') {

    try {
        stage("Build") {

            def workspace = pwd()

            checkout scm

            echo sh(returnStdout: true, script: "git tag --points-at HEAD").trim()

            docker.image("headforwardsspd/node-cd:latest").pull()

            docker.image("headforwardsspd/node-cd:latest").inside {

                sh '''
                    npm prune
                    npm install
                    npm run build-production
                '''
                sh '''
                    cd e2e
                    npm prune
                    npm install
                '''
            }
        }
        stage("Test") {
            parallel unit: {

                def workspace = pwd()

                    docker.image("headforwardsspd/node-cd:latest").inside {

                    try {

                        sh '''
                            mkdir -p build/unit
                            npm test
                        '''

                    } catch(error) {

                        throw(error)

                    } finally {

                        junit 'build/unit/test-results.xml'

                        publishHTML([
                            allowMissing:          true,
                            alwaysLinkToLastBuild: true,
                            keepAll:               true,
                            reportDir:             'build/unit/code-coverage',
                            reportFiles:           'index.html',
                            reportName:            'Code Coverage'
                        ])
                    }
                }
            },
            e2e: {

                def workspace = pwd()

                docker.image("headforwardsspd/node-cd:latest").withRun("-u root -v ${workspace}:/usr/src/app", "bash -c 'cd /usr/src/app; node config/server.js'") {app ->

                    def hotelsDocker = app.id

                    docker.image("selenium/node-chrome").withRun("--link=${hotelsDocker}:www.hotels.com --link selenium-hub:hub") {

                        docker.image("headforwardsspd/node-cd:latest").inside("--link selenium-hub:selenium-hub  -v ${workspace}:/usr/src/app") {

                            try {

                                sh '''
                                    cd /usr/src/app/e2e
                                    mkdir -p ../build/e2e
                                    npm test
                                '''

                            } catch(error) {

                                throw(error)

                            } finally {

                                sh "cat build/e2e/test-results.json | ./e2e/node_modules/.bin/cucumber-junit > build/e2e/test-results.xml"
                                junit 'build/e2e/test-results.xml'
                                publishHTML([
                                    allowMissing:          true,
                                    alwaysLinkToLastBuild: true,
                                    keepAll:               true,
                                    reportDir:             'build/e2e/features',
                                    reportFiles:           'index.html',
                                    reportName:            'Features'
                                ])
                            }
                        }
                    }
                }
            }
        }
        stage("Deploy") {

            def GIT_TAG = sh(returnStdout: true, script: "git tag --points-at HEAD").trim();

            if (GIT_TAG) {

                parallel sandbox: {

                    def netlifySandboxUrl    = ''

                    echo 'Trigger Netlify Build'
                    sh "curl -X POST -d '{}' ${netlifySandboxUrl}"

                },
                production: {

                    def netlifyProductionUrl = ''

                    echo 'Trigger Netlify Build'
                    sh "curl -X POST -d '{}' ${netlifyProductionUrl}"
                }
            } else {

                echo "Not deploying: ${GIT_TAG}"
            }

            currentBuild.result = "SUCCESS"
        }

    } catch (e) {

        echo 'Something went wrong'
        currentBuild.result = "FAILED"

        throw e

    } finally {

        def GIT_TAG = sh(returnStdout: true, script: "git tag --points-at HEAD").trim();
    
        if (GIT_TAG) {

            echo 'send slack notification'
    
            def buildColor = 'good'
    
            if (currentBuild.result == 'FAILED') {
    
                buildColor = 'danger'
            }
    
            def title = "${currentBuild.fullDisplayName}"
            def text  = "The pipeline ${currentBuild.fullDisplayName} completed.\nView test results <${BUILD_URL}|${GIT_TAG}:${BUILD_DISPLAY_NAME}>"
    
            notifySlack (currentBuild.result, [[
                title: title,
                color: buildColor,
                text:  text
            ]])
        } else {
            
            echo "${currentBuild.fullDisplayName}: The pipeline ${currentBuild.fullDisplayName} completed."
        }
    }
}