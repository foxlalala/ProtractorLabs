// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 600000,
  specs: [
    './src/**/*.e2e-spec.ts' // 要進行測試的檔案
  ],
  capabilities: {
    browserName: 'chrome', // 要執行的瀏覽器
    chromeOptions: {
      args: [
        // "--headless", // 做 headless , 如果想看到頁面記得打開 --window-size
        // "--window-size=1920,1080",
        // "--incognito",
        // "--start-maximized"
      ]
    }
  },

  // 使用 async / await (避免使用內建的 control flow)
  SELENIUM_PROMISE_MANAGER: false,

  directConnect: true, // 設定直接控制瀏覽器
  //seleniumServerJar: '../node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-3.141.59.jar',
  baseUrl: 'http://localhost:4200/',

  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 100000000, // 每一個 it 執行的 timeout 時間
    print: function () { }
  },


  /** 執行測試前的準備工作 */
  async onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });

    // 設定報告的方式
    jasmine.getEnv().addReporter(new SpecReporter({
      // https://github.com/bcaudan/jasmine-spec-reporter/blob/master/src/configuration.ts
      spec: {
        displayStacktrace: false // 關閉完整的錯誤訊息
      }
    }));

    /**
     * @type { import("protractor").ProtractorBrowser }
     */
    // const browser = global['browser'];
    // await browser.manage().timeouts().implicitlyWait(2000);
  }
};
