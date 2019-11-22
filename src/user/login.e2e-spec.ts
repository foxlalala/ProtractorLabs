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

    describe('vue 官網查詢 SSR', () => {
        it('輸入 SSR 後, 浮動畫面有 The Complete SSR Guide 字串', async () => {
            // 重要!! 測試非 Angular 網頁要加這一行
            // 注意: 這是全域設定, 會影響後續的測試案例
            await browser.waitForAngularEnabled(false);

            // vue 官網跑很慢 => 因為 vue 官網有設定離線機制, 會把整個站點載下來
            await browser.get('https://vuejs.org/');

            element(by.id('search-query-nav')).sendKeys('SSR');

            // 重要!! 等待浮動畫面的查詢結果
            browser.sleep(1000);

            const result = element(by.id('algolia-autocomplete-listbox-0')).getText();
            expect(result).toContain('The Complete SSR Guide');

            // 恢復設定
            await browser.waitForAngularEnabled(true);
        });
    });

});
