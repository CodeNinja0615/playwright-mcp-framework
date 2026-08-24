import { BasePage } from '../base.page.js';

class HeaderComponent extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.homeButton = page.getByRole('button', { name: /HOME/ });
    this.ordersButton = page.getByRole('button', { name: /ORDERS/ });
    this.cartButton = page.getByRole('button', { name: /^(?!.*Add To).*Cart(?: \d+)?$/ });
    this.signOutButton = page.getByRole('button', { name: 'Sign Out' });
  }

  /** @returns {Promise<void>} */
  async goHome() {
    await this.homeButton.click();
  }

  /** @returns {Promise<void>} */
  async openOrders() {
    await this.ordersButton.click();
  }

  /** @returns {Promise<void>} */
  async openCart() {
    await this.cartButton.click();
  }

  /** @returns {Promise<void>} */
  async signOut() {
    await this.signOutButton.click();
  }

  /** @returns {import('@playwright/test').Locator} */
  getCartButton() {
    return this.cartButton;
  }
}

export { HeaderComponent };
