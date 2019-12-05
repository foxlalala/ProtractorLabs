import { browser, by, element } from 'protractor';

fdescribe('the user submit a questionnaire', () => {
    it('驗證畫面上顯示 驗證碼正確', async () => {
        await browser.get('/labs/captcha');
        await browser.wait(waitForKeyIn, 10000);

        await element(by.buttonText('送出')).click();

        const result = await element(by.tagName('form')).getText();
        expect(result).toContain('驗證碼正確');
    });

    function waitForKeyIn() {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                element(by.name('captchaCode')).getAttribute('value').then(x => {
                    if (x.length === 4) {
                        // 一定要清掉!!
                        clearInterval(interval);

                        resolve('條件成立');
                    }
                });
            }, 500);
        });
    }

});
