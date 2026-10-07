import { test, expect } from '@playwright/test';

test.describe(`To login to https://demoqa.com/login`, async () => {
    test(`To login to an application`, async ({ page }) => {
        await page.goto('https://demoqa.com/login');
        await page.locator(`//input[@id='userName']`).fill('admin');
        await page.fill(`//input[@id='password']`, 'admin');
        await page.locator(`//button[text()="Login"]`).click();
        const ele = page.locator('//p[contains(text(), "Invalid username or password!")]');
        await ele.waitFor({ timeout: 5000 });
        await expect(ele).toContainText('Invalid username or password!');
        
    });
});