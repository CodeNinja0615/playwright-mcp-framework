import { BasePage } from './base.page.js';
import { HeaderComponent } from './components/header.component.js';

class DashboardPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.searchInput = page.getByRole('textbox', { name: 'search' });
    this.minPriceInput = page.getByRole('textbox', { name: 'Min Price' });
    this.maxPriceInput = page.getByRole('textbox', { name: 'Max Price' });
    this.resultsSummary = page.getByText(/Showing \d+ results/);
    this.pagination = page.getByRole('list', { name: 'Pagination' });
  }

  /** @returns {Promise<void>} */
  async goto() {
    await this.page.goto('/client/#/dashboard/dash');
  }

  /**
   * @param {string} query
   * @returns {Promise<void>}
   */
  async search(query) {
    await this.searchInput.fill(query);
  }

  /**
   * @param {string|number} minimum
   * @param {string|number} maximum
   * @returns {Promise<void>}
   */
  async setPriceRange(minimum, maximum) {
    await this.minPriceInput.fill(String(minimum));
    await this.maxPriceInput.fill(String(maximum));
  }

  /**
   * @param {string} filterName
   * @returns {import('@playwright/test').Locator}
   */
  filterCheckbox(filterName) {
    return this.page.getByText(filterName, { exact: true }).locator('..').getByRole('checkbox');
  }

  /**
   * @param {string} filterName
   * @returns {Promise<void>}
   */
  async selectFilter(filterName) {
    await this.filterCheckbox(filterName).check();
  }

  /**
   * @param {string} productName
   * @returns {import('@playwright/test').Locator}
   */
  productCard(productName) {
    return this.page.locator('div.card-body').filter({ hasText: productName });
  }

  /**
   * @param {string} productName
   * @returns {Promise<void>}
   */
  async viewProduct(productName) {
    await this.productCard(productName).getByRole('button', { name: 'View' }).click();
  }

  /**
   * @param {string} productName
   * @returns {Promise<void>}
   */
  async addProductToCart(productName) {
    await this.productCard(productName).getByRole('button', { name: /Add To Cart/ }).click();
  }

  /** @returns {Promise<void>} */
  async openNextPage() {
    await this.pagination.getByText('Next', { exact: false }).click();
  }

  /** @returns {import('@playwright/test').Locator} */
  getResultsSummary() {
    return this.resultsSummary;
  }
}

export { DashboardPage };
