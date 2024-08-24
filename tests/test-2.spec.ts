import { test, expect } from '@playwright/test';
import { Utils } from './sfUtils';
import { SFSettings } from './sfSettings';

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
 * Here, `mohan.chinnappan.n.ea10@gmail.com` is the `orgName` and should be filled in the `sfLoginData` object.
 * 
 * @author Mohan Chinnappan
 */

// Salesforce login configuration
const sfLoginData = {
  orgName: "mohan.chinnappan.n.ea10@gmail.com", // The Salesforce organization alias or username
  homePage: '/lightning/page/home',             // The Salesforce Home page path
  setupPage: '/lightning/setup/SetupOneHome/home' // The Salesforce Setup page path
};

/**
 * Perform Salesforce login and navigate to the Home page.
 * 
 * @param page - The Playwright page object used for navigation.
 * @returns The login result containing the instance URL and other details.
 */
const performSfLogin = async (page) => {
  const results = await Utils.sfLogin(sfLoginData.orgName, sfLoginData.homePage);
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
  const results = await Utils.sfLogin(sfLoginData.orgName, sfLoginData.setupPage);
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
test('SFLogin', async ({ page }) => {
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
    await page.getByRole('link', { name: 'Accounts' }).click();
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByLabel('*Account Name').fill(account.name);
    await page.getByLabel('Account Number').fill(account.number);
    await page.getByRole('button', { name: 'Save', exact: true }).click();
  }
};

// Sample account data to be added
const accounts = [
  { name: 'MCTest6', number: "6666" },
  { name: 'MCTest7', number: "77777" },
];

/**
 * Test: Add Accounts to Salesforce
 * 
 * This test adds a given list of accounts into Salesforce.
 */
test('AddAccounts', async ({ page }) => {
  test.setTimeout(SFSettings.SLOW);
  await addAccounts(page, accounts);
});

/**
 * Configuration data for setting email deliverability in Salesforce.
 */
const emailDeliverabilityData = {
  setTo: '2' // 0: No access, 1: System Email Only, 2: All email
};

/**
 * Test: Set Email Deliverability in Salesforce
 * 
 * This test sets the email deliverability to the desired setting.
 */
test('SetEmailDeliverability', async ({ page }) => {
  const results = await performSfLoginSetup(page);
  const instanceUrl = results.instanceUrl;
  console.log(`Navigating to ${instanceUrl}`);
  await page.goto(`${instanceUrl}/email-admin/editOrgEmailSettings.apexp?appLayout=setup&noS1Redirect=true`);

  await page.locator('[id="thePage\\:theForm\\:editBlock\\:sendEmailAccessControlSection\\:sendEmailAccessControl\\:sendEmailAccessControlSelect"]').selectOption(emailDeliverabilityData.setTo);
  await page.getByRole('button', { name: 'Save' }).click();
});

