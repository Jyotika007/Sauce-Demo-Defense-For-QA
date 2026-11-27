import { test, expect } from '../fixtures';
import { users } from '../test-data/users';
import { catalogue, expectedNameOrder, expectedPriceOrder } from '../test-data/products';
import { SortOption } from '../pages/inventory.page';

test.describe('Products and sorting', () => {
  test.beforeEach(async ({ loginAs }) => {
    await loginAs(users.standard);
  });

  test('all products are listed with the expected names', async ({ inventoryPage }) => {
    await expect(inventoryPage.items).toHaveCount(catalogue.length);

    const names = await inventoryPage.productNames();
    expect([...names].sort()).toEqual(catalogue.map((p) => p.name).sort());
  });

  test('each product shows the expected price', async ({ inventoryPage }) => {
    for (const product of catalogue) {
      await expect.soft(inventoryPage.priceOf(product.name), product.name).toHaveText(`$${product.price}`);
    }
  });

  for (const [option, expected] of Object.entries(expectedNameOrder)) {
    test(`sorting by name (${option}) orders the products correctly`, async ({ inventoryPage }) => {
      await inventoryPage.sortBy(option as SortOption);

      await expect.poll(() => inventoryPage.productNames()).toEqual(expected);
    });
  }

  for (const [option, expected] of Object.entries(expectedPriceOrder)) {
    test(`sorting by price (${option}) orders the prices correctly`, async ({ inventoryPage }) => {
      await inventoryPage.sortBy(option as SortOption);

      await expect.poll(() => inventoryPage.productPrices()).toEqual(expected);
    });
  }
});
