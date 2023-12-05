import { type Locator, type Page } from "@playwright/test";

export class StartSessionPage {
  readonly page: Page;
  readonly sidebarArrow: Locator;
  readonly myHistory: Locator;
  readonly newConversationBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebarArrow = page.locator(".sidebar-arrow");
    this.myHistory = page.locator("div #myHistoryTitle span");
    this.newConversationBtn = page.locator("button#spanNewConversation");
  }

  async startNewConversation() {
    await this.newConversationBtn.click();
  }

  async openSidebar() {
    await this.sidebarArrow.click();
  }
}
