import { Locator, Page } from '@playwright/test';
import { inventoryLocators } from '../locators/inventory.locators';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly cartBadge: Locator;

  constructor(private readonly page: Page) {
    this.title = page.locator(inventoryLocators.title);
    this.items = page.locator(inventoryLocators.item);
    this.cartBadge = page.locator(inventoryLocators.cartBadge);
  }

  async productNames(): Promise<string[]> {
    return this.page.locator(inventoryLocators.itemName).allTextContents();
  }

  async productPrices(): Promise<number[]> {
    const raw = await this.page.locator(inventoryLocators.itemPrice).allTextContents();
    return raw.map((text) => parseFloat(text.replace('$', '')));
  }

  priceOf(productName: string): Locator {
    return this.items.filter({ hasText: productName }).locator(inventoryLocators.itemPrice);
  }

  async sortBy(option: SortOption) {
    await this.page.locator(inventoryLocators.sortDropdown).selectOption(option);
  }

  async addToCart(productName: string) {
    await this.items.filter({ hasText: productName }).locator('button').click();
  }

  async removeFromCart(productName: string) {
    await this.items.filter({ hasText: productName }).locator('button:has-text("Remove")').click();
  }

  async openCart() {
    await this.page.locator(inventoryLocators.cartLink).click();
  }

  async logout() {
    await this.page.locator(inventoryLocators.menuButton).click();
    await this.page.locator(inventoryLocators.logoutLink).click();
  }
}
