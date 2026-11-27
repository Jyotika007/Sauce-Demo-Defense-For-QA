import { Locator, Page } from '@playwright/test';
import { loginLocators } from '../locators/login.locators';
import { paths } from '../test-data/routes';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.usernameInput = page.locator(loginLocators.usernameInput);
    this.passwordInput = page.locator(loginLocators.passwordInput);
    this.loginButton = page.locator(loginLocators.loginButton);
    this.errorMessage = page.locator(loginLocators.errorMessage);
  }

  async goto() {
    await this.page.goto(paths.login);
  }

  /** Empty strings are typed as-is, so "empty field" cases behave like a user leaving the field blank. */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
