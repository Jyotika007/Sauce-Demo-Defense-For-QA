import { Locator, Page } from '@playwright/test';
import { cartLocators } from '../locators/cart.locators';

export class CartPage {
  readonly items: Locator;

  constructor(private readonly page: Page) {
    this.items = page.locator(cartLocators.item);
  }

  async itemNames(): Promise<string[]> {
    return this.page.locator(cartLocators.itemName).allTextContents();
  }

  async removeItem(productName: string) {
    await this.items.filter({ hasText: productName }).locator(cartLocators.removeButton).click();
  }

  async checkout() {
    await this.page.locator(cartLocators.checkoutButton).click();
  }

  async continueShopping() {
    await this.page.locator(cartLocators.continueShoppingButton).click();
  }
}
