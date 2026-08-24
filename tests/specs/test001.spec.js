import { test, expect } from "@playwright/test";

test.describe(``, () => {
    // test.beforeAll(``, async ({ browser }) => {
    //     const page = await (await browser.newContext()).newPage();
    // });
    test(``, async ({ page }) => {
        await page.goto('');
    });
});