import { test, expect, Locator, Page } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

export class MainPage {
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;

    this.elements = [
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "Playwright logo Playwright" }),
        name: "Playwright logo",
        text: "Playwright",
        attribute: {
          type: "href",
          value: "/",
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "Docs" }),
        name: "Docs link",
        text: "Docs",
        attribute: {
          type: "href",
          value: "/docs/intro",
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "MCP", exact: true }),
        name: "MCP link",
        text: "MCP",
        attribute: {
          type: "href",
          value: "/mcp/introduction",
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "CLI", exact: true }),
        name: "CLI link",
        text: "CLI",
        attribute: {
          type: "href",
          value: "/agent-cli/introduction",
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "API" }),
        name: "API link",
        text: "API",
        attribute: {
          type: "href",
          value: "/docs/api/class-playwright",
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("button", { name: "Node.js" }),
        name: "Node.js button",
        text: "Node.js",
      },
      {
        locator: (page: Page): Locator => page.getByLabel("GitHub repository"),
        name: "GitHub logo",
        attribute: {
          type: "href",
          value: "https://github.com/microsoft/playwright",
        },
      },
      {
        locator: (page: Page): Locator => page.getByLabel("Discord server"),
        name: "Discord logo",
        attribute: {
          type: "href",
          value: "https://aka.ms/playwright/discord",
        },
      },
      {
        locator: (page: Page): Locator =>
          page.getByLabel(
            "Switch between dark and light mode (currently system mode)",
          ),
        name: "change mode button",
      },
      {
        locator: (page: Page): Locator => page.getByLabel("Search (Control+k)"),
        name: "search",
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("heading", { name: "Playwright enables reliable" }),
        name: "title",
        text: "Playwright enables reliable web automation for testing, scripting, and AI\u00a0agents.",
      },
      {
        locator: (page: Page): Locator =>
          page.getByRole("link", { name: "Get started" }),
        name: "Get started button",
        text: "Get started",
        attribute: {
          type: "href",
          value: "/docs/intro",
        },
      },
    ];
  }

  async openMainPage() {
    await this.page.goto("https://playwright.dev/");
  }

  async checkElementsVisability() {
    for (const { locator, name } of this.elements) {
      await expect.soft(locator(this.page)).toBeVisible({ name });
    }
  }

  async checkElementsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        const element = locator(this.page);
        const actualText = (await element.textContent())?.trim();
        await expect.soft(actualText).toEqual(text);
      }
    }
  }

  async checkHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await expect
          .soft(locator(this.page))
          .toHaveAttribute(attribute.type, attribute.value);
      }
    }
  }

  async clickSwitchLightModeIcon() {
    await this.page
      .getByRole("button", { name: /Switch between dark and light/ })
      .click();
  }

  async checkDataThemeAtrtributValue() {
    const htmlElement = this.page.locator("html");
    await expect.soft(htmlElement).toHaveAttribute("data-theme");
  }

  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector("html")?.setAttribute("data-theme", "light");
    });
  }

  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector("html")?.setAttribute("data-theme", "dark");
    });
  }

  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot(`pageWithlightMode.png`);
  }

  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`pageWithdarkMode.png`);
  }
}
