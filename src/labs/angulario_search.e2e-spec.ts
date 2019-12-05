import { browser, by, element, ExpectedConditions as EC } from 'protractor';

describe('the user does search on angular.io', () => {
    it('連線到 angular 官網', async () => {
        const angularUrl = 'https://angular.io/';
        await browser.get(angularUrl);

        const result = await browser.getCurrentUrl();
        expect(result).toBe(angularUrl);
    });

    it('查尋 ngZone 出現 "NgZone" 標籤 ', async () => {
        await element(by.css('[type="search"]')).sendKeys('ngZone');

        const cond = EC.textToBePresentInElement(element(by.className('search-results')), 'NgZone');
        await browser.wait(cond, 5000);

        await element(by.linkText('NgZone')).click();

        const result = await element(by.tagName('h1')).getText();
        expect(result).toBe('NgZone');
    });
});
