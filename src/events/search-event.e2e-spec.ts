import { browser, by, element } from 'protractor';

describe('於搜尋文字方塊輸入 Angular 並點擊搜尋', () => {
    it('驗證畫面上是否出現搜尋結果', async () => {
        await browser.get('/events');

        await element(by.name('searchTerm')).sendKeys('Angular');
        await element(by.buttonText('搜尋')).click();

        const result = await element(by.id('searchResults')).isDisplayed();
        expect(result).toBe(true);
    });

    it('驗證畫面上是否出現 3 個搜尋結果', async () => {
        const result = await element.all(by.className('list-group-item'));
        expect(result.length).toBe(3);
    });

    it('驗證活動標題是否為「ANGULAR 7 開發實戰：新手入門篇」', async () => {
        await element(by.linkText('Angular 基礎觀念')).click();

        const result = await element(by.tagName('h2')).getText();
        expect(result).toContain('ANGULAR 7 開發實戰：新手入門篇');
    });
});

