// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const isDocker = require('is-docker')();

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular/cli/plugins/karma')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['junit', 'progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'ChromeHeadless', 'FirefoxHeadless', 'PhantomJS'],
    singleRun: false,
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        // We must disable the Chrome sandbox when running Chrome inside docker
        flags: isDocker ? ['--no-sandbox']: []
      },
      FirefoxHeadless: {
        base: 'Firefox',
        flags: isDocker ? ['-headless' ]: []
      }
    },
    junitReporter: {
      outputDir: 'test_results'
    }
  });
};
