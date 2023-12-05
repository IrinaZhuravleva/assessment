import { expect, test } from "@playwright/test";

import { LoginPage } from "@pages/login-page";
import { NewConversationPage } from "@pages/new-conversation-page";
import { StartSessionPage } from "@pages/start-session-page";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.logIn();
});

test("Open Last Sessions & verify “My History” title exists", async ({
  page,
}) => {
  const startSessionPage = new StartSessionPage(page);
  await startSessionPage.openSidebar();

  await expect(startSessionPage.myHistory).toContainText("My history");
});

test("Create new conversation", async ({ page }) => {
  const startSessionPage = new StartSessionPage(page);
  const newConversationPage = new NewConversationPage(page);

  await startSessionPage.startNewConversation();
  await newConversationPage.fillInForm();
});

test("Upload document from Assets and send to customer", async ({ page }) => {
  const startSessionPage = new StartSessionPage(page);
  const newConversationPage = new NewConversationPage(page);

  await expect(page.getByText("Document to approve")).not.toBeVisible();

  await startSessionPage.startNewConversation();
  await newConversationPage.fillInForm();
  await newConversationPage.sendDocuments();

  await expect(page.getByText("Document to approve")).toBeVisible();
});
