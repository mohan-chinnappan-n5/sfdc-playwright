import { test, expect } from "@playwright/test";
import { Utils } from "./sfUtils";
import { SFSettings } from "./sfSettings";

/**
 * Salesforce Playwright Test Suite
 *
 * This test suite contains various automated tests for Salesforce using Playwright.
 * It includes tests for Salesforce login, account creation, setting email deliverability,
 * adding users, and running the Salesforce Optimizer.
 *
 * Prerequisites:
 * - Ensure you have logged into the Salesforce org using:
 *   - `sf force auth web login -r https://login.salesforce.com`
 *   or
 *   - `sf force auth web login -r https://test.salesforce.com`
 * - Ensure you have the `orgName` available.
 *
 * Example:
 * Successfully authorized mohan.chinnappan.n.ea10@gmail.com with org ID 00DHs000000QASYMA4
 * Here, `mohan.chinnappan.n.ea10@gmail.com` should be set in the `sfLoginData` object in `sfSettings.ts`.
 *
 * Author: Mohan Chinnappan
 */

/**
 * Logs into Salesforce and navigates to the Home page.
 *
 * @param page - The Playwright page object used for navigation.
 * @returns The result of the login operation, including the instance URL.
 */
const performSfLogin = async (page) => {
  const results = await Utils.sfLogin(
    SFSettings.sfLoginData.orgName,
    SFSettings.sfLoginData.homePage
  );
  const url = results.result.url;
  console.log(`Navigating to ${url}`);
  await page.goto(url);
  return results;
};

/**
 * Logs into Salesforce and navigates to the Setup page.
 *
 * @param page - The Playwright page object used for navigation.
 * @returns The result of the login operation, including the instance URL.
 */
const performSfLoginSetup = async (page) => {
  const results = await Utils.sfLogin(
    SFSettings.sfLoginData.orgName,
    SFSettings.sfLoginData.setupPage
  );
  const url = results.result.url;
  console.log(`Navigating to ${url}`);
  await page.goto(url);
  return results;
};

/**
 * Test: Salesforce Login
 *
 * Logs into Salesforce and navigates to the Home page.
 */
test("SFLogin", async ({ page }) => {
  await performSfLogin(page);
});

/**
 * Adds a list of accounts to Salesforce.
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
 * Adds a list of sample accounts to Salesforce.
 */
test("AddAccounts", async ({ page }) => {
  test.setTimeout(SFSettings.SLOW);
  await addAccounts(page, SFSettings.sampleAccounts);
});

/**
 * Test: Set Email Deliverability
 *
 * Sets the email deliverability to the desired level in Salesforce.
 */
test("SetEmailDeliverability", async ({ page }) => {
  const results = await performSfLoginSetup(page);
  const instanceUrl = results.instanceUrl;
  console.log(`Navigating to ${instanceUrl}`);
  await page.goto(`${instanceUrl}/${SFSettings.emailDeliverabilityLink}`);
  await page
    .locator(SFSettings.emailDeliverabilityLocator)
    .selectOption(SFSettings.emailDeliverabilityData.setTo);
  await page.getByRole("button", { name: "Save" }).click();
});

/**
 * Test: Add Users
 *
 * Adds a list of sample superhero users to Salesforce.
 */
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

/**
 * Test: Show Setup Audit Trail
 *
 * Navigates to the Setup Audit Trail page in Salesforce.
 */
test("ShowSetupAuditTrail", async ({ page }) => {
  const results = await performSfLoginSetup(page);
  const instanceUrl = results.instanceUrl;
  console.log(`Navigating to ${instanceUrl}`);
  await page.goto(`${instanceUrl}/${SFSettings.setupAuditTrailLink}`);
  // Uncomment the following lines to handle file downloads if needed
  // const downloadPromise = page.waitForEvent('download');
  // await page.getByRole('link', { name: 'Download', exact: true }).click();
  // const download = await downloadPromise;
});

/**
 * Test: Run Optimizer
 *
 * Navigates to the Salesforce Optimizer and runs the optimization.
 */
test("RunOptimizer", async ({ page }) => {
  const results = await performSfLoginSetup(page);
  const instanceUrl = results.instanceUrl;
  console.log(`Navigating to ${instanceUrl}`);
  await page.goto(`${instanceUrl}/${SFSettings.lightningUrl}`);
  const page7Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Open Optimizer' }).click();
  const page7 = await page7Promise;
  await page7.locator('runtime_platform_optimizer-org-metric-list-header').getByRole('button', { name: 'Run Optimizer' }).click();
});


/**
 * Test:  Password reset for all users of the org
 *
 * Sets the  Password reset for all users of the org
 * so when next time users log in, they will be asked to set their passwords to a new value.
 
 */
test("Security: PasswordRest for all users", async ({ page }) => {
  const results = await performSfLoginSetup(page);
  const instanceUrl = results.instanceUrl;
  console.log(`Navigating to ${instanceUrl}`);
  await page.goto(`${instanceUrl}/${SFSettings.passwordResetForAllUsersUrl}`);

  await page.getByLabel('Expire all user passwords').check();
  await page.getByRole('button', { name: 'Save' }).click();
});


/**
 * Test: Security Health Check 
 *
 * Goes the page:  Security Health Check  
 
 */
test("Perf: Edge Setup", async ({ page }) => {
  const results = await performSfLogin(page);
  const lexInstanceUrl = Utils.sf2lexUrl(results.instanceUrl) ;
  console.log(`Navigating to ${lexInstanceUrl}`);
  await page.goto(`${lexInstanceUrl}/${SFSettings.lexMyDomainUrl}`);

});

