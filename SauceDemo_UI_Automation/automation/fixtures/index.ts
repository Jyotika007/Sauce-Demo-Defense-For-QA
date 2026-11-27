import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { TestUser, users } from '../test-data/users';
import { Product } from '../test-data/products';

interface Fixtures {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  /** Opens the login page and signs in as the given user. */
  loginAs: (user: TestUser) => Promise<void>;
  /** Logs in as the standard user, adds the products and opens checkout step one. */
  startCheckout: (items: Product[]) => Promise<void>;
}

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  loginAs: async ({ loginPage }, use) => {
    await use(async (user) => {
      await loginPage.goto();
      await loginPage.login(user.username, user.password);
    });
  },
  startCheckout: async ({ loginAs, inventoryPage, cartPage }, use) => {
    await use(async (items) => {
      await loginAs(users.standard);
      for (const item of items) await inventoryPage.addToCart(item.name);
      await inventoryPage.openCart();
      await cartPage.checkout();
    });
  },
});

export { expect } from '@playwright/test';
