import { BasePage } from './base.page.js';
import { HeaderComponent } from './components/header.component.js';

class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.cartHeading = page.getByRole('heading', { name: 'My Cart' });
    this.continueShoppingButton = page.getByRole('button', { name: /Continue Shopping/ });
    this.cartItems = page.getByRole('list').filter({ has: page.getByText(/MRP \$/) });
    this.subtotal = page.getByText('Subtotal', { exact: true }).locator('..');
    this.total = page.getByText('Total', { exact: true }).locator('..');
    this.checkoutButton = page.getByRole('button', { name: /Checkout/ });
  }

  /** @returns {Promise<void>} */
  async goto() {
    await this.page.goto('/client/#/dashboard/cart');
  }

  /**
   * @param {string} productName
   * @returns {import('@playwright/test').Locator}
   */
  cartItem(productName) {
    return this.page.getByRole('listitem').filter({ hasText: productName });
  }

  /**
   * @param {string} productName
   * @returns {Promise<void>}
   */
  async buyItemNow(productName) {
    await this.cartItem(productName).getByRole('button', { name: /Buy Now/ }).click();
  }

  /** @returns {Promise<void>} */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /** @returns {Promise<void>} */
  async checkout() {
    await this.checkoutButton.click();
  }

  /** @returns {import('@playwright/test').Locator} */
  getCartItems() {
    return this.cartItems;
  }

  /** @returns {import('@playwright/test').Locator} */
  getSubtotal() {
    return this.subtotal;
  }

  /** @returns {import('@playwright/test').Locator} */
  getTotal() {
    return this.total;
  }
}

export { CartPage };
