import { expect, test } from '@playwright/test';
import { DashboardPage } from '../pageobjects/dashboard.page.js';
import { LoginPage } from '../pageobjects/login.page.js';
import credentials from '../testdata/credentials.json' with { type: 'json' };

test.describe('Login with direct page-object imports', () => {
  test('should log in successfully with valid credentials @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await test.step('Submit valid login credentials', async () => {
      await loginPage.goto();
      await loginPage.login(credentials.email, credentials.password);
    });

    await test.step('Verify the authenticated dashboard is displayed', async () => {
      await expect(dashboardPage.header.signOutButton).toBeVisible();
      await expect(dashboardPage.searchInput).toBeVisible();
      await expect(dashboardPage.page).toHaveURL(/\/client\/#\/dashboard\/dash/);
    });
  });
});