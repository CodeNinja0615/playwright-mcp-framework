import { expect, test } from '@playwright/test';
import { CartPage } from '../pageobjects/cart.page.js';
import { CheckoutPage } from '../pageobjects/checkout.page.js';
import { DashboardPage } from '../pageobjects/dashboard.page.js';
import { LoginPage } from '../pageobjects/login.page.js';
import { OrderConfirmationPage } from '../pageobjects/order-confirmation.page.js';
import credentials from '../testdata/credentials.json' with { type: 'json' };
import orderData from '../testdata/order-data.json' with { type: 'json' };

test.describe('Complete an order', () => {
  test('should complete an order and display the confirmation details @e2e', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);
    await test.step('Log in to the application', async () => {
      await loginPage.goto();
      await loginPage.login(credentials.email, credentials.password);
      await expect(dashboardPage.header.signOutButton).toBeVisible();
    });

    await test.step('Add a product to the cart', async () => {
      await dashboardPage.addProductToCart(orderData.productName);
      await dashboardPage.header.openCart();
      await expect(cartPage.cartHeading).toBeVisible();
      await expect(cartPage.cartItem(orderData.productName)).toBeVisible();
    });

    await test.step('Continue to the payment screen', async () => {
      await cartPage.checkout();
      await expect(page).toHaveURL(/\/client\/#\/dashboard\/order\?/);
      await expect(checkoutPage.placeOrderLink).toBeVisible();
    });

    await test.step('Fill payment and shipping details for India', async () => {
      await checkoutPage.selectPaymentMethod(orderData.paymentMethod);
      await checkoutPage.fillCardNumber(orderData.cardNumber);
      await checkoutPage.selectExpiry(orderData.expiryMonth, orderData.expiryYear);
      await checkoutPage.fillCvv(orderData.cvv);
      await checkoutPage.fillNameOnCard(orderData.nameOnCard);
      await checkoutPage.fillShippingEmail(credentials.email);
      await checkoutPage.selectCountry(orderData.country);
    });

    await test.step('Place the order and verify the captured confirmation details', async () => {
      await checkoutPage.placeOrder();
      await expect(orderConfirmationPage.getSuccessToast()).toBeVisible();
      await expect(orderConfirmationPage.getConfirmationMessage()).toContainText('Thankyou for the order');
      await expect(orderConfirmationPage.getOrderId()).toContainText(/\| [a-f0-9]+ \|/i);
      await expect(orderConfirmationPage.getOrderedProductDetails()).toContainText(orderData.productName);
      await expect(orderConfirmationPage.getOrderedProductDetails()).toContainText(`Qty: ${orderData.quantity}`);
      await expect(orderConfirmationPage.getOrderedProductDetails()).toContainText(orderData.price);
    });
  });
});