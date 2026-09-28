import { test, expect, Page, Locator } from "@playwright/test";
import { MainPage } from "../models/MainPage";

let mainPage: MainPage

test.describe("Тесты главной страницы", () => {
  test.beforeEach(async ({ page }) => {
        mainPage = new MainPage(page);
        await mainPage.openMainPage();
  });

  test("Проверка видимости элементов хедера", async () => {
    await mainPage.checkElementsVisability();
  });

  test("Проверка названий элементов хедера", async () => {
    await mainPage.checkElementsText();
  });

  test("Проверка атрибута href элементов хедера", async () => {
    await mainPage.checkHrefAttribute();
  });

  test("Проверка переключения на темный режим", async () => {
    await mainPage.clickSwitchLightModeIcon();
    await mainPage.checkDataThemeAtrtributValue();

    // if (currentTheme === "light") {
    //   await expect
    //     (page.locator("html"))
    //     .toHaveAttribute("data-theme", "dark");
    // } else {
    //   await expect
    //     (page.locator("html"))
    //     .toHaveAttribute("data-theme", "light");
    // }
  });

  test(`Проверка стилей светлого мода`, async () => {
    await mainPage.setLightMode();
    await mainPage.checkLayoutWithLightMode();
  });

  test(`Проверка стилей темного мода`, async () => {
    await mainPage.setDarkMode();
    await mainPage.checkLayoutWithDarkMode();
  });
});
