import { browser, by, element } from 'protractor';

describe('體驗卡關的感覺', () => {
    it('測試- ngZone', async () => {
        // 跳脫 ngZone 的方法之一 : 沒這行就會卡住
        await browser.waitForAngularEnabled(false);

        await browser.get('/labs/questionnaire');

        await element(by.name('username')).sendKeys('John');
        await element(by.name('codeLanguage')).sendKeys('C#');
        await element(by.buttonText('送出')).click();

        const result = await element(by.css('form')).getText();
        expect(result).toContain('送出成功');

        await browser.waitForAngularEnabled(true);
    });

});
