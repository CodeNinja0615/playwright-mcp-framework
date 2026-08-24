import { expect, test } from '../fixtures/fixtures.js';
import credentials from '../testdata/cred.json' with { type: 'json' };

test.describe('Login', () => {
  test('should log in successfully with valid credentials @smoke', async ({ loginPage, dashboardPage }) => {
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