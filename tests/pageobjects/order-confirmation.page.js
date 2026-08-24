import { BasePage } from './base.page.js';

class OrderConfirmationPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.confirmationMessage = page.getByRole('heading', { name: 'Thankyou for the order.' });
    this.orderId = page.getByText(/\| [a-f0-9]{24} \|/i);
    this.orderedProductDetails = page.locator('tr.line-item');
    this.successToast = page.getByText('Order Placed Successfully', { exact: true });
  }

  /** @returns {import('@playwright/test').Locator} */
  getConfirmationMessage() {
    return this.confirmationMessage;
  }

  /** @returns {import('@playwright/test').Locator} */
  getOrderId() {
    return this.orderId;
  }

  /** @returns {import('@playwright/test').Locator} */
  getOrderedProductDetails() {
    return this.orderedProductDetails;
  }

  /** @returns {import('@playwright/test').Locator} */
  getSuccessToast() {
    return this.successToast;
  }
}

export { OrderConfirmationPage };