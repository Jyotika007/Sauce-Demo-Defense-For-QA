import { Locator, Page } from '@playwright/test';
import { checkoutLocators } from '../locators/checkout.locators';
import { CheckoutInfo } from '../test-data/checkout';

export interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
}

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly errorMessage: Locator;
  readonly completeHeader: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.locator(checkoutLocators.firstNameInput);
    this.lastNameInput = page.locator(checkoutLocators.lastNameInput);
    this.postalCodeInput = page.locator(checkoutLocators.postalCodeInput);
    this.errorMessage = page.locator(checkoutLocators.errorMessage);
    this.completeHeader = page.locator(checkoutLocators.completeHeader);
  }

  /** Only fills the fields that are provided, so missing-field cases can be expressed directly. */
  async fillInformation(info: Partial<CheckoutInfo>) {
    if (info.firstName) await this.firstNameInput.fill(info.firstName);
    if (info.lastName) await this.lastNameInput.fill(info.lastName);
    if (info.postalCode) await this.postalCodeInput.fill(info.postalCode);
  }

  async continue() {
    await this.page.locator(checkoutLocators.continueButton).click();
  }

  async cancel() {
    await this.page.locator(checkoutLocators.cancelButton).click();
  }

  async readSummary(): Promise<OrderSummary> {
    const toNumber = async (selector: string) =>
      parseFloat(((await this.page.locator(selector).textContent()) ?? '').replace(/[^0-9.]/g, ''));
    return {
      subtotal: await toNumber(checkoutLocators.subtotalLabel),
      tax: await toNumber(checkoutLocators.taxLabel),
      total: await toNumber(checkoutLocators.totalLabel),
    };
  }

  async finish() {
    await this.page.locator(checkoutLocators.finishButton).click();
  }

  async backHome() {
    await this.page.locator(checkoutLocators.backHomeButton).click();
  }
}
