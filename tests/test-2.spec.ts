import { test, expect } from '@playwright/test';
import { Utils } from './sfUtils';
import { SFSettings } from './sfSettings'; 





/*
======================================================
 make sure you have logged into the org with
 sf force auth web login -r https://login.salesforce.com 
 OR
 sf force auth web login -r https://test.salesforce.com 

 and have the orgName handy

 example:
 Successfully authorized mohan.chinnappan.n.ea10@gmail.com with org ID 00DHs000000QASYMA4

 here:  mohan.chinnappan.n.ea10@gmail.com is orgName
 and fill in this orgName below object

======================================================
*/

const sfLoginData = {
  orgName: "mohan.chinnappan.n.ea10@gmail.com" ,
  homePage: '/lightning/page/home',
  setupPage : '/lightning/setup/SetupOneHome/home'
}


// sf login function
const performSfLogin = async page => {
  const results = await Utils.sfLogin(sfLoginData.orgName, sfLoginData.homePage);
  const url = results.result.url;
  console.log(url);
  await page.goto(url);
  return results;
}

const performSfLoginSetup = async page => {
  const results = await Utils.sfLogin(sfLoginData.orgName, sfLoginData.setupPage);
  const url = results.result.url;
  console.log(url);
  await page.goto(url);
  return results;
}


test('SFLogin', async ({ page }) => {
  await performSfLogin(page);
});

//------------------------------------------
// function to add Accounts in Salesforce
const addAccounts = async (page, data) => {
  for (const account of data) {
    await performSfLogin(page);
    await page.getByRole('link', { name: 'Accounts' }).click();
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByLabel('*Account Name').fill(account.name);
    await page.getByLabel('Account Number').fill(account.number);
    await page.getByRole('button', { name: 'Save', exact: true }).click();
    }
}

const accounts = [
  {name: 'MCTest6', number: "6666"},
  {name: 'MCTest7', number: "77777"},
];

// test to add a  given list of accounts into Salesforce
test('AddAccounts', async ({ page }) => {
  test.setTimeout(SFSettings.SLOW);
  // test.slow(); //  Marks a test as "slow". Slow test will be given triple the default timeout.
  await addAccounts(page, accounts)
});


//------------------------------------------
const emailDeliverabilityData = {
  setTo: '0' //0: No access, 1: System Email Only, 2: All email
};
test('SetEmailDeliverability', async ({ page }) => {
  //test.setTimeout(SLOW);
  // test.slow(); //  Marks a test as "slow". Slow test will be given triple the default timeout.

  const results = await performSfLoginSetup(page);
  console.log(results);
  const instanceUrl = results.instanceUrl; 
  console.log(`goto ${instanceUrl}`);
  await page.goto(`${instanceUrl}/email-admin/editOrgEmailSettings.apexp?appLayout=setup&noS1Redirect=true`)

  await page.locator('[id="thePage\\:theForm\\:editBlock\\:sendEmailAccessControlSection\\:sendEmailAccessControl\\:sendEmailAccessControlSelect"]').selectOption(emailDeliverabilityData.setTo);
  await page.getByRole('button', { name: 'Save' }).click();
});




