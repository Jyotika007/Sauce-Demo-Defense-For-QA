import { test, expect } from '../fixtures';
import { products } from '../test-data/products';
import { missingFieldCases, TAX_RATE, validCheckoutInfo } from '../test-data/checkout';
import { urlPattern } from '../test-data/routes';

test.describe('Checkout', () => {
  for (const c of missingFieldCases) {
    test(`checkout information is rejected: ${c.title}`, async ({ page, startCheckout, checkoutPage }) => {
      await startCheckout([products.backpack]);

      await checkoutPage.fillInformation(c.info);
      await checkoutPage.continue();

      await expect(checkoutPage.errorMessage).toContainText(c.expectedError);
      await expect(page).toHaveURL(urlPattern.checkoutInformation);
    });
  }

  test('cancelling the information step returns to the cart', async ({ page, startCheckout, checkoutPage }) => {
    await startCheckout([products.backpack]);

    await checkoutPage.cancel();

    await expect(page).toHaveURL(urlPattern.cart);
  });

  test('a single-item order shows the correct summary and completes', async ({ page, startCheckout, inventoryPage, checkoutPage }) => {
    await startCheckout([products.backpack]);

    await checkoutPage.fillInformation(validCheckoutInfo);
    await checkoutPage.continue();
    await expect(page).toHaveURL(urlPattern.checkoutOverview);

    const summary = await checkoutPage.readSummary();
    expect(summary.subtotal).toBe(products.backpack.price);
    expect(summary.tax).toBeCloseTo(products.backpack.price * TAX_RATE, 2);
    expect(summary.total).toBeCloseTo(summary.subtotal + summary.tax, 2);

    await checkoutPage.finish();
    await expect(page).toHaveURL(urlPattern.checkoutComplete);
    await expect(checkoutPage.completeHeader).toContainText(/thank you for your order/i);

    await checkoutPage.backHome();
    await expect(page).toHaveURL(urlPattern.inventory);
    await expect(inventoryPage.cartBadge).toHaveCount(0); // cart is emptied after the order
  });

  test('a multi-item order adds up correctly', async ({ page, startCheckout, checkoutPage }) => {
    const items = [products.backpack, products.bikeLight, products.fleeceJacket];
    await startCheckout(items);

    await checkoutPage.fillInformation(validCheckoutInfo);
    await checkoutPage.continue();
    await expect(page).toHaveURL(urlPattern.checkoutOverview);

    const summary = await checkoutPage.readSummary();
    const expectedSubtotal = items.reduce((sum, item) => sum + item.price, 0);
    expect(summary.subtotal).toBeCloseTo(expectedSubtotal, 2);
    expect(summary.tax).toBeCloseTo(expectedSubtotal * TAX_RATE, 2);
    expect(summary.total).toBeCloseTo(summary.subtotal + summary.tax, 2);
  });
});
