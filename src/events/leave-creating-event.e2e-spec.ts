import { browser, by, element } from 'protractor';

describe('測試切換視窗', () => {
    it('驗證導頁到 http://localhost:4200/events', async () => {
        await browser.get('/events/new');

        await element(by.buttonText('取消')).click();

        browser.switchTo().alert().accept();

        const result = await browser.getCurrentUrl();
        expect(result).toBe('http://localhost:4200/events');
    });
});
