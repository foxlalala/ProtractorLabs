import { addMask, compareScreenshot } from 'blue-harvest';
import { browser, by, element } from 'protractor';

describe('實戰演練：練習遮罩動態圖的呈現測試', () => {
    it('實戰演練：練習遮罩動態圖的呈現測試', async () => {
        await browser.get('/labs/gif');

        await browser.manage().window().setSize(1366, 1024);
        const golden = 'src/assets/goldens/giflab.png';
        const diffDir = 'src/assets/goldens/';

        const gif_img = element(by.id('gif-img'));
        // 遮罩動態物件
        await addMask(gif_img, 'gray');

        await browser.waitForAngular(); // 截圖前一定要 wait

        const actual = await browser.takeScreenshot();
        const result = await compareScreenshot(actual, golden, diffDir);
        expect(result).toBeTruthy();
    });
});
