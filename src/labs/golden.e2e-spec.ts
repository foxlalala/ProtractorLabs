import { compareScreenshot } from 'blue-harvest';
import { browser } from 'protractor';

describe('main page present', () => {
    it('實戰演練：練習畫面呈現測試', async () => {
        await browser.get('/events');

        await browser.manage().window().setSize(1366, 1024);
        const golden = 'src/assets/goldens/home.png';
        const diffDir = 'src/assets/goldens/'; // 會產生 diff-home.png

        await browser.waitForAngular(); // 截圖前一定要 wait

        const actual = await browser.takeScreenshot();
        const result = await compareScreenshot(actual, golden, diffDir);
        expect(result).toBeTruthy();
    });
});
