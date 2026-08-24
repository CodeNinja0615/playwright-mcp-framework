import { expect, test as base } from '@playwright/test';
import { DashboardPage, LoginPage } from '../pageobjects/index.js';

const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect, test };