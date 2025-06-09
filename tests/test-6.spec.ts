import { test, expect } from '@playwright/test';

test('Written with DeploySentinel Recorder', async ({ page }) => {
  // Load "http://localhost:9000/github-pages/mohan-chinnappan-n5.github.io/apps/3/index.html?c=Data%20Apps"
  await page.goto('http://localhost:9000/github-pages/mohan-chinnappan-n5.github.io/apps/3/index.html?c=Data%20Apps');

  // Resize window to 1470 x 838
  await page.setViewportSize({ width: 1470, height: 838 });

  // Click on <li> "Books, Blogs and Notes"
  await page.click('.cursor-pointer:nth-child(1)');

  // Click on <li> "Data Apps"
  await page.click('.cursor-pointer:nth-child(3)');

  // Click on <li> "Database"
  await page.click('.cursor-pointer:nth-child(5)');

  // Click on <li> "XML Apps"
  await page.click('.cursor-pointer:nth-child(7)');

  // Click on <li> "Generic Apps"
  await page.click('.cursor-pointer:nth-child(9)');
});