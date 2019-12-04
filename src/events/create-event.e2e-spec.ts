import * as path from 'path';
import { browser, by, element } from 'protractor';

fdescribe('練習表單操作', () => {
    it('填寫表單-建立活動，驗證活動列表顯示「Protractor 實戰」', async () => {
        await browser.get('/events/new');

        await element(by.id('name')).sendKeys('Protractor 實戰');

        // await 點選日期19971231();
        // 測試不會測套件, 所以正常都直接用 sendKeys 就可以
        await element(by.id('eventDate')).sendKeys('2019/11/16');

        await element(by.id('eventTime')).sendKeys('早上');
        await element(by.id('eventPrice')).sendKeys('500');
        await element(by.id('address')).sendKeys('中正路100號');
        await element(by.id('city')).sendKeys('台北市');
        await element(by.id('country')).sendKeys('台灣');
        await element(by.id('onlineUrl')).sendKeys('http://example.com');

        const imgPath = path.resolve('./src/assets/Protractor.png');
        await element(by.id('imageFile')).sendKeys(imgPath);

        await element(by.buttonText('儲存')).click();

        const result = await element(by.tagName('ng-component')).getText();
        expect(result).toContain('PROTRACTOR 實戰');
    });

    it('填寫表單-建立議程，驗證議程列表顯示「Protractor 實戰」', async () => {
        await browser.get('/events/1');

        await element(by.linkText('建立議程')).click();
        await element(by.id('sessionName')).sendKeys('Protractor 表單練習');
        await element(by.id('presenter')).sendKeys('John');
        await element(by.name('duration')).element(by.cssContainingText('option', '一小時')).click();
        await element(by.css(`input[type=radio][name=period][value=上午場]`)).click();
        await element(by.css(`input[type=checkbox][name=level][value=初級]`)).click();
        await element(by.css(`input[type=checkbox][name=level][value=中級]`)).click();
        await element(by.id('abstract')).sendKeys('自動化 Protractor 表單');

        await element(by.buttonText('儲存')).click();

        const result = await element(by.tagName('ng-component')).getText();
        expect(result).toContain('Protractor 表單練習');
    });
});
async function 點選日期19971231() {
    await element(by.tagName('mat-datepicker-toggle')).click();
    await element(by.css(`button[type="button"][aria-label^="Choose"]`)).click();
    await element(by.css(`button[type="button"][aria-label^="Previous"]`)).click();
    await element(by.cssContainingText('.mat-calendar-body-cell-content', '1997')).click();
    await element(by.cssContainingText('.mat-calendar-body-cell-content', 'DEC')).click();
    await element(by.cssContainingText('.mat-calendar-body-cell-content', '31')).click();
}

