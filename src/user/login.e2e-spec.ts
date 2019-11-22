import { browser, by, element } from 'protractor';

describe('登入功能的 E2E 測試', () => {

    it('進入到登入頁面', async () => {
        await browser.get('/');

        await element(by.linkText('登入')).click();

        const result = await browser.getCurrentUrl();
        expect(result).toContain('/user/login');
    });

    it('輸入帳號密碼登入成功', async () => {
        await element(by.id('userName')).sendKeys('John');
        await element(by.id('password')).sendKeys('123456');

        await element(by.buttonText('登入')).click();

        const result = await browser.getCurrentUrl();
        expect(result).toContain('/events');
    });

    it('輸入帳號密碼登入失敗', async () => {
        await browser.get('/');

        await element(by.linkText('登入')).click();

        await element(by.id('userName')).sendKeys('John');
        await element(by.id('password')).sendKeys('abc');

        await element(by.buttonText('登入')).click();

        // 自己寫的
        // const result = element(by.className('alert alert-danger')).getText();

        // 保哥提供 : 測試要更容易懂
        // 方案 A
        // const result = element(by.css('body')).getText();
        // 方案 B
        const result = element(by.css('ng-component')).getText();
        expect(result).toContain('錯誤');
    });

});
