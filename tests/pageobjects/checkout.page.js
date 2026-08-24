import { BasePage } from './base.page.js';
import { HeaderComponent } from './components/header.component.js';

class CheckoutPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.paymentMethod = (method) => page.getByText(method, { exact: true });
    this.creditCardNumberInput = page.getByText('Credit Card Number', { exact: true }).locator('..').getByRole('textbox');
    this.expiryMonthSelect = page.locator('select.input.ddl').first();
    this.expiryYearSelect = page.locator('select.input.ddl').last();
    this.nameOnCardInput = page.getByText('Name on Card', { exact: true }).locator('..').getByRole('textbox');
    this.couponInput = page.getByRole('textbox', { name: 'coupon' });
    this.applyCouponButton = page.getByRole('button', { name: 'Apply Coupon' });
    this.shippingSection = page.getByText('Shipping Information', { exact: true }).locator('..');
    this.shippingEmailInput = this.shippingSection.getByRole('textbox').first();
    this.countryInput = page.getByPlaceholder('Select Country');
    this.placeOrderLink = page.getByRole('link', { name: /Place Order/ });
  }

  /**
   * @param {string} orderQuery
   * @returns {Promise<void>}
   */
  async goto(orderQuery) {
    const query = orderQuery ? `?${orderQuery}` : '';
    await this.page.goto(`/client/#/dashboard/order${query}`);
  }

  /**
   * @param {string} method
   * @returns {Promise<void>}
   */
  async selectPaymentMethod(method) {
    await this.paymentMethod(method).click();
  }

  /**
   * @param {string} cardNumber
   * @returns {Promise<void>}
   */
  async fillCardNumber(cardNumber) {
    await this.creditCardNumberInput.fill(cardNumber);
  }

  /**
   * @param {string} month
   * @param {string} year
   * @returns {Promise<void>}
   */
  async selectExpiry(month, year) {
    await this.expiryMonthSelect.selectOption(month);
    await this.expiryYearSelect.selectOption(year);
  }

  /**
   * @param {string} name
   * @returns {Promise<void>}
   */
  async fillNameOnCard(name) {
    await this.nameOnCardInput.fill(name);
  }

  /**
   * @param {string} coupon
   * @returns {Promise<void>}
   */
  async applyCoupon(coupon) {
    await this.couponInput.fill(coupon);
    await this.applyCouponButton.click();
  }

  /**
   * @param {string} email
   * @returns {Promise<void>}
   */
  async fillShippingEmail(email) {
    await this.shippingEmailInput.fill(email);
  }

  /**
   * @param {string} country
   * @returns {Promise<void>}
   */
  async selectCountry(country) {
    await this.countryInput.fill(country);
    await this.page.getByText(country, { exact: true }).click();
  }

  /** @returns {Promise<void>} */
  async placeOrder() {
    await this.placeOrderLink.click();
  }

  /** @returns {import('@playwright/test').Locator} */
  getPlaceOrderLink() {
    return this.placeOrderLink;
  }
}

export { CheckoutPage };
