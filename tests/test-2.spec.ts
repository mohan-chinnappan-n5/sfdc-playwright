import { test, expect } from '@playwright/test';

const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const execEnv = { env: { ...process.env, FORCE_COLOR: "0" } };


const sfLogin = async (orgName, page) => {
  const cmd = `sf org:open -o ${orgName} --path ${page} --url-only --json`;
  console.log(cmd);
  let sfOutput = await exec(cmd, execEnv);
  const results = JSON.parse(sfOutput.stdout.trim());
  return results;
}

const sfLoginData = {
  orgName: "mohan.chinnappan.n.ea10@gmail.com" ,
  page: '/lightning/page/home' 
}

const performSfLogin = async page => {
  const results = await sfLogin(sfLoginData.orgName, sfLoginData.page);
  const url = results.result.url;
  console.log(url);
  await page.goto(url);
}

test('SFLogin', async ({ page }) => {
  await performSfLogin(page);

});

const addAccount = async (page, data) => {
  await page.getByRole('link', { name: 'Accounts' }).click();
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByLabel('*Account Name').fill(data.name);
  await page.getByLabel('Account Number').fill(data.number);
  await page.getByRole('button', { name: 'Save', exact: true }).click();
}

test('AddAccount', async ({ page }) => {
  await performSfLogin(page);
  await addAccount(page, {name: 'MCTest2', number: "22222"})
});


