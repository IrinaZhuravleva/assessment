import { expect, test } from "@playwright/test";

import { LoginPage } from "@pages/login-page";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.logIn();
});

test("Login as Agent", async ({ page }) => {
  await expect(page).toHaveURL(
    "https://staging1.lightico.com/agentDesktop.aspx",
  );
});
