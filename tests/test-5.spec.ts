import { test, expect } from '@playwright/test';

test('icongen', async ({ page }) => {

  const icons = ['CMS', 'MC', 'AJK', 'ken', 'dmr', 'rms'];
  for (const icon of icons) {
      await page.goto('https://mohan-chinnappan-n5.github.io/icon/popup.html');
      await page.getByPlaceholder('Sam').click();
      await page.getByPlaceholder('Sam').fill(icon);
      await page.getByLabel('Font Color:').click();
      await page.getByLabel('Font Color:').fill('#b9b1b1');
      await page.locator('html').click();
      await page.getByLabel('Background Color:').click();
      await page.getByLabel('Background Color:').fill('#153579');
      await page.locator('html').click();
      await page.screenshot({ path: `output/icons/${icon}.png`, fullPage: true });
  }
});