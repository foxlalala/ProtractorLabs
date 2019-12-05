import { browser, by, element, ExpectedConditions as EC } from 'protractor';

fdescribe('add a new user', () => {
    it('驗證網址導向 http://localhost:4200/events', async () => {
        await browser.get('/user/new');

        await element(by.id('username')).sendKeys('mike');
        await element(by.id('password')).sendKeys('123');
        await element(by.id('firstName')).sendKeys('bob');
        await element(by.id('lastName')).sendKeys('joe');
        await element(by.id('membershipterm')).click();

        const handles = await browser.getAllWindowHandles();
        await browser.switchTo().window(handles[1]);
        // 新開啟的視窗是一般的 HTML, 所以要關閉 Angular
        await browser.waitForAngularEnabled(false);

        await browser.executeScript(() => {
            return window.scrollTo(0, document.body.scrollHeight);
        });

        const okButton = element(by.buttonText('同意'));

        // 特殊的 HTML 頁面, 要滾到最底端, 按鈕才會 Enable
        const cond = EC.elementToBeClickable(okButton);
        await browser.wait(cond, 5000);

        await okButton.click();

        await browser.switchTo().window(handles[0]);
        // 回到 Angular 頁面, 所以要啟用 Angular
        await browser.waitForAngularEnabled(true);
        await element(by.buttonText('新增')).click();

        const result = await browser.getCurrentUrl();
        expect(result).toBe('http://localhost:4200/events');
    });
});
