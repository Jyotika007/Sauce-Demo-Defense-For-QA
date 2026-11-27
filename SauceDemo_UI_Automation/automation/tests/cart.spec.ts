import { test, expect } from '../fixtures';
import { users } from '../test-data/users';
import { products } from '../test-data/products';
import { urlPattern } from '../test-data/routes';

test.describe('Shopping cart', () => {
  test.beforeEach(async ({ loginAs }) => {
    await loginAs(users.standard);
  });

  test('adding and removing a product updates the cart badge', async ({ inventoryPage }) => {
    await expect(inventoryPage.cartBadge).toHaveCount(0); // a new session starts with an empty cart

    await inventoryPage.addToCart(products.backpack.name);
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.removeFromCart(products.backpack.name);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('cart page lists the added products and allows removing one', async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.name);
    await inventoryPage.addToCart(products.bikeLight.name);
    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(urlPattern.cart);
    expect(await cartPage.itemNames()).toEqual(
      expect.arrayContaining([products.backpack.name, products.bikeLight.name])
    );

    await cartPage.removeItem(products.bikeLight.name);
    await expect(cartPage.items).toHaveCount(1);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('cart contents are kept when the user continues shopping', async ({ page, inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.onesie.name);
    await inventoryPage.openCart();
    await cartPage.continueShopping();

    await expect(page).toHaveURL(urlPattern.inventory);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });
});
