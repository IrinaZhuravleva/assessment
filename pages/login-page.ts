import { type Locator, type Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly welcomeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = page.locator('input[id="Username"]');
    this.passwordInput = page.locator('input[id="Password"]');
    this.loginBtn = page.locator('input[id="buttonLogIn"]');
    this.welcomeHeader = page.locator("h1.welcome");
  }

  async goto() {
    await this.page.goto("https://staging1login.lightico.com/");
  }

  async logIn() {
    await this.loginInput.fill(process.env.LOGIN);
    await this.passwordInput.fill(process.env.PASSWORD);
    await this.loginBtn.click();
    
    await this.welcomeHeader.isVisible();
  }
}
