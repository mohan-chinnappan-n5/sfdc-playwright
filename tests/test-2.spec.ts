import { test, expect } from "@playwright/test";
import { Utils } from "./sfUtils";
import { SFSettings } from "./sfSettings";

/**
 * Salesforce Playwright Test Suite
 *
 * This test suite includes various automated tests for Salesforce using Playwright.
 * It handles Salesforce login, account creation, and setting email deliverability settings.
 *
 * Make sure you have logged into the org with:
 *
 * - `sf force auth web login -r https://login.salesforce.com`
 *   or
 * - `sf force auth web login -r https://test.salesforce.com`
 *
 * and have the `orgName` handy.
 *
 * Example:
 *
 * Successfully authorized mohan.chinnappan.n.ea10@gmail.com with org ID 00DHs000000QASYMA4
 *
 * Here, `mohan.chinnappan.n.ea10@gmail.com` is the `orgName` and should be filled in the `sfLoginData` object in sfSettings.ts.
 *
 * @author Mohan Chinnappan
 */


/**
 * Perform Salesforce login and navigate to the Home page.
 *
 * @param page - The Playwright page object used for navigation.
 * @returns The login result containing the instance URL and other details.
 */
const performSfLogin = async (page) => {
  const results = await Utils.sfLogin(
    SFSettings.sfLoginData.orgName,
    SFSettings.sfLoginData.homePage
  );
  const url = results.result.url;
  console.log(url);
  await page.goto(url);
  return results;
};

/**
 * Perform Salesforce login and navigate to the Setup page.
 *
 * @param page - The Playwright page object used for navigation.
 * @returns The login result containing the instance URL and other details.
 */
const performSfLoginSetup = async (page) => {
  const results = await Utils.sfLogin(
    SFSettings.sfLoginData.orgName,
    SFSettings.sfLoginData.setupPage
  );
  const url = results.result.url;
  console.log(url);
  await page.goto(url);
  return results;
};

/**
 * Test: Salesforce Login Test
 *
 * This test logs into Salesforce and navigates to the Home page.
 */
test("SFLogin", async ({ page }) => {
  await performSfLogin(page);
});

/**
 * Function to add accounts in Salesforce.
 *
 * @param page - The Playwright page object used for navigation.
 * @param data - Array of account objects containing name and number.
 */
const addAccounts = async (page, data) => {
  for (const account of data) {
    await performSfLogin(page);
    await page.getByRole("link", { name: "Accounts" }).click();
    await page.getByRole("button", { name: "New" }).click();
    await page.getByLabel("*Account Name").fill(account.name);
    await page.getByLabel("Account Number").fill(account.number);
    await page.getByRole("button", { name: "Save", exact: true }).click();
  }
};


/**
 * Test: Add Accounts to Salesforce
 *
 * This test adds a given list of accounts into Salesforce.
 */
test("AddAccounts", async ({ page }) => {
  test.setTimeout(SFSettings.SLOW);
  await addAccounts(page, SFSettings.sampleAccounts);
});



/**
 * Test: Set Email Deliverability in Salesforce
 *
 * This test sets the email deliverability to the desired setting.
 */
test("SetEmailDeliverability", async ({ page }) => {
  const results = await performSfLoginSetup(page);
  const instanceUrl = results.instanceUrl;
  console.log(`Navigating to ${instanceUrl}`);
  await page.goto(
    `${instanceUrl}/email-admin/editOrgEmailSettings.apexp?appLayout=setup&noS1Redirect=true`
  );

  await page
    .locator(
      '[id="thePage\\:theForm\\:editBlock\\:sendEmailAccessControlSection\\:sendEmailAccessControl\\:sendEmailAccessControlSelect"]'
    )
    .selectOption(SFSettings.emailDeliverabilityData.setTo);
  await page.getByRole("button", { name: "Save" }).click();
});



test("AddUsers", async ({ page }) => {
  test.setTimeout(SFSettings.SLOW);

  for (const hero of SFSettings.superHeroes) {
    const results = await performSfLoginSetup(page);
    const instanceUrl = results.instanceUrl;
    console.log(`Navigating to ${instanceUrl}`);
    await page.goto(
      `${instanceUrl}/005?isUserEntityOverride=1&appLayout=setup&noS1Redirect=true`
    );
    await page.getByRole("button", { name: "New User" }).first().click();
    await page.getByLabel("First Name").click();
    await page.getByLabel("First Name").fill(hero.firstName);
    await page.getByLabel("First Name").press("Tab");
    await page.getByLabel("*Last Name").fill(hero.lastName);
    await page.getByLabel("*Last Name").press("Tab");
    await page.getByLabel("*Email", { exact: true }).fill(hero.email);
    await page
      .getByRole("row", {
        name: "User Edit Save Save & New Cancel Skip to Accessibility Mode preference",
        exact: true,
      })
      .locator('input[name="save"]')
      .click();
  }
});

