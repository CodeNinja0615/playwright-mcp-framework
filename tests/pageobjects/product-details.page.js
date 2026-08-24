import { BasePage } from './base.page.js';
import { HeaderComponent } from './components/header.component.js';

class ProductDetailsPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.productTitle = page.getByRole('heading', { level: 2 });
    this.productPrice = page.getByRole('heading', { level: 3 });
    this.productDetails = page.getByRole('heading', { name: 'product details' });
    this.continueShoppingLink = page.getByRole('link', { name: /Continue Shopping/ });
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
  }

  /**
   * @param {string} productId
   * @returns {Promise<void>}
   */
  async goto(productId) {
    await this.page.goto(`/client/#/dashboard/product-details/${productId}`);
  }

  /** @returns {Promise<void>} */
  async addToCart() {
    await this.addToCartButton.click();
  }

  /** @returns {Promise<void>} */
  async continueShopping() {
    await this.continueShoppingLink.click();
  }

  /** @returns {import('@playwright/test').Locator} */
  getProductTitle() {
    return this.productTitle;
  }

  /** @returns {import('@playwright/test').Locator} */
  getProductPrice() {
    return this.productPrice;
  }

  /** @returns {import('@playwright/test').Locator} */
  getProductDetails() {
    return this.productDetails.locator('..').getByRole('paragraph');
  }
}

export { ProductDetailsPage };
