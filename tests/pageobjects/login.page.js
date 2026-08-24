import { BasePage } from './base.page.js';

class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#userEmail');
    this.passwordInput = page.locator('#userPassword');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.registerLink = page.getByRole('link', { name: 'Register' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
  }

  /** @returns {Promise<void>} */
  async goto() {
    await this.page.goto('/client/#/auth/login');
  }

  /**
   * @param {string} email
   * @param {string} password
   * @returns {Promise<void>}
   */
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** @returns {Promise<void>} */
  async openRegistration() {
    await this.registerLink.click();
  }

  /** @returns {Promise<void>} */
  async openForgotPassword() {
    await this.forgotPasswordLink.click();
  }

  /** @returns {import('@playwright/test').Locator} */
  getEmailInput() {
    return this.emailInput;
  }

  /** @returns {import('@playwright/test').Locator} */
  getPasswordInput() {
    return this.passwordInput;
  }
}

export { LoginPage };
