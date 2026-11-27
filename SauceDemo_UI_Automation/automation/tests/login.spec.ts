import { test, expect } from '../fixtures';
import { invalidLoginCases, users } from '../test-data/users';
import { catalogue } from '../test-data/products';
import { paths, urlPattern } from '../test-data/routes';

test.describe('Login', () => {
  test('standard user can log in and sees the product list', async ({ page, loginAs, inventoryPage }) => {
    await loginAs(users.standard);

    await expect(page).toHaveURL(urlPattern.inventory);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.items).toHaveCount(catalogue.length);
  });

  for (const c of invalidLoginCases) {
    test(`login is rejected: ${c.title}`, async ({ page, loginPage }) => {
      await loginPage.goto();
      await loginPage.login(c.username, c.password);

      await expect(loginPage.errorMessage).toContainText(c.expectedError);
      await expect(loginPage.loginButton).toBeVisible(); // still on the login page
      await expect(page).not.toHaveURL(urlPattern.inventory);
    });
  }

  test('user can log out and returns to the login page', async ({ loginAs, inventoryPage, loginPage }) => {
    await loginAs(users.standard);
    await inventoryPage.logout();

    await expect(loginPage.loginButton).toBeVisible();
  });

  test('product page cannot be opened without logging in', async ({ page, loginPage }) => {
    await page.goto(paths.inventory);

    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.errorMessage).toContainText(/logged in/i);
    await expect(page).not.toHaveURL(urlPattern.inventory);
  });
});
