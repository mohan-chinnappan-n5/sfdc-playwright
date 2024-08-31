import { test, expect } from "@playwright/test";

import { SFSettings } from "./sfSettings";

test("LicensePlateGen", async ({ page }) => {

  await page.goto(
    "https://mohan-chinnappan-n5.github.io/common/license-plate/index.html"
  );
  await page.getByRole("textbox").nth(1).click();
  await page.getByRole("textbox").nth(1).fill("#78a749");
  await page.getByRole("textbox").nth(2).click();
  await page.getByRole("textbox").nth(2).fill("#0466c8");
  await page.getByRole("textbox").nth(3).click();
  await page.getByRole("textbox").nth(3).fill("#edb7b7");

  await page.screenshot({ path: `license.png`, fullPage: true });

});


test("LicensePlateGenMulti", async ({ page }) => {

  await page.goto(
    "https://mohan-chinnappan-n5.github.io/common/license-plate/index.html"
  );

  const states = SFSettings.states;

  for (const state of states) {
    await page.getByRole('combobox').selectOption(state);
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill('#7ad61f');
    await page.getByRole('textbox').nth(2).click();
    await page.getByRole('textbox').nth(2).fill('#1675d4');
    await page.getByRole('textbox').nth(3).click();
    await page.getByRole('textbox').nth(3).fill('#4f0808');
    await page.screenshot({ path: `${(state).replace(' ','_')}.png`, fullPage: true });
  }
});

