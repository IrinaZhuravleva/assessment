import { expect, type Locator, type Page } from "@playwright/test";

export class NewConversationPage {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly modal: Record<string, Locator>;
  readonly userFolderToggle: Locator;
  readonly userDocumentsBtn: Locator;
  readonly userFirstDocument: Locator;
  readonly sendFileBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modal = {
      startNewConversationBtn: page.locator(
        "button#buttonStartNewConversation",
      ),
      inputPhoneNewConversation: page.locator(
        "input#inputPhoneNewConversation",
      ),
      inputNameNewConversation: page.locator("input#inputNameNewConversation"),
    };
    this.userFolderToggle = page
      .locator("#browser span")
      .filter({ hasText: "Candidate" })
      .locator("div")
      .nth(1);
    this.userFirstDocument = page
      .getByRole("listitem", {
        name: "AdHocWithOneCustomerSignature2PagesTestForCiMachine.pdf",
      })
      .locator("span");
    this.sendFileBtn = page.locator("span#buttonSendFile");
  }

  async fillInForm() {
    await expect(this.modal.inputPhoneNewConversation).toBeVisible();
    await expect(this.modal.inputNameNewConversation).toBeVisible();

    await this.modal.inputPhoneNewConversation.fill(process.env.PHONE);
    await this.modal.inputNameNewConversation.fill(process.env.USERNAME);
    await expect(this.modal.startNewConversationBtn).toBeVisible();
    await this.modal.startNewConversationBtn.click();
  }

  async sendDocuments() {
    await this.userFolderToggle.click();
    await this.userFirstDocument.click();
    await this.sendFileBtn.click();
    await this.userFolderToggle.click();
  }
}
