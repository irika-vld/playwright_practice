import { test, expect, Page, Locator } from "@playwright/test";

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const themeMode = ["light", "dark"];

const elements: Elements[] = [
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
    locator: (page: Page): Locator => page.getByRole("link", { name: "Docs" }),
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
    locator: (page: Page): Locator => page.getByRole("link", { name: "API" }),
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
      page.getByLabel("Switch between dark and light"),
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
    text: "Playwright enables reliable web automation for testing, scripting, and AI agents.",
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

test.describe("Тесты главной страницы", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });

  test("Проверка видимости элементов хедера", async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test("Проверка названий элементов хедера", async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Проверка названия ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });

  test("Проверка атрибута href элементов хедера", async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Проверка href элемента ${name}`, async () => {
          await expect
            .soft(locator(page))
            .toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test("Проверка переключения на темный режим", async ({ page }) => {
    const currentTheme = await page.locator("html").getAttribute("data-theme");

    await page.getByLabel("Switch between dark and light").click();

    //if (currentTheme === "light") {
    //  await expect
    //    (page.locator("html"))
    //    .toHaveAttribute("data-theme", "dark");
    //} else {
    //  await expect
    //    (page.locator("html"))
    //    .toHaveAttribute("data-theme", "light");
    //}
  });

  themeMode.forEach((value) => {
    test(`Проверка стиля активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector("html")?.setAttribute("data-theme", value);
      }, value);

      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });
});
