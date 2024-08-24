import { test, expect } from "@playwright/test";

test("ThankYou", async ({ page }) => {
  await page.goto("https://mohan-chinnappan-n5.github.io/apps/2/index.html");
  await page.getByRole("link", { name: "Thank you! Card Generator" }).click();
  await page
    .getByLabel("Appreciation Template:")
    .fill(
      "We stand on your shoulders! Thank you for your awesome and exceptional contributions. "
    );
  await page.getByRole("button", { name: "Generate Appreciation" }).click();
});

test("ThankYouKen", async ({ page }) => {

  test.slow();

  await page.goto("https://mohan-chinnappan-n5.github.io/apps/2/index.html");
  await page.getByRole("link", { name: "Thank you! Card Generator" }).click();
  await expect(page).toHaveTitle("Letter of Appreciation Generator");

  await page
    .getByLabel("Appreciation Template:")
    .fill(
      "We stand on your shoulders! Thank you for your awesome and exceptional contributions. "
    );
  await page.getByRole("button", { name: "Generate Appreciation" }).click();
  const text = await page.getByText("Letter of Appreciation Dear");

  await page.getByRole('button', { name: 'Create Image' }).click();
  
  const name = 'ken';
  await page.screenshot({ path: `${name}.png`, fullPage: true });


  console.log(text);
});

test("ThankYouNew", async ({ page }) => {
  const greetings = [
    {
      to: "Dennis M Ritchie",
      from: "Mohan  Chinnappan",
      msg: " I am writing to express my heartfelt appreciation and gratitude to you for creating C Language,  Unix Operating System,  Plan9 OS and many others",
      template: "We stand on your shoulders! Thank you for your lovely and exceptional contributions."
    },

    {
      to: "Ken Thompson",
      from: "Mohan  Chinnappan",
      msg: " I am writing to express my heartfelt appreciation and gratitude to you for creating B Language,  Unix Operating System, ed, grep, UTF-8, Go Language and many others",
      template: "We stand on your shoulders! Thank you for your lovely and exceptional contributions."
    },

    {
      to: "Elon Musk",
      from: "Mohan  Chinnappan",
      msg: " I am writing to express my heartfelt appreciation and gratitude to you for efforts in Electric Vehicle Development, Rocket Technology" ,
      template: "We stand on your shoulders! Thank you for your lovely and exceptional contributions."
    },

    {
      to: "Dr. Adbul Kalam",
      from: "Mohanasundaram  Chinnappan",
      msg: " I am writing to express my heartfelt appreciation and gratitude to you for efforts in guiding Indians to prepare for the future" ,
      template: "We stand on your shoulders! Thank you for your lovely and exceptional contributions."
    },


  ];

  for (const greeting of greetings) {
    await page.goto("https://mohan-chinnappan-n5.github.io/apps/2/index.html");
    await page.getByRole("link", { name: "Thank you! Card Generator" }).click();
    await expect(page).toHaveTitle("Letter of Appreciation Generator");

    await page.getByLabel("Recipient's Name:").fill(greeting.to);
    await page.getByLabel("Recipient's Name:").press("Tab");
    await page.getByLabel("Sender's Name:").fill(greeting.from);
    await page .getByLabel("Appreciation Message:") .fill(greeting.msg);
    await page .getByLabel("Appreciation Template:") .fill(greeting.template); 
    
    
    await page.getByRole("button", { name: "Generate Appreciation" }).click();
    await page.getByRole("button", { name: "Create Image" }).click();

    await page.screenshot({ path: `${(greeting.to).replace(' ','_')}.png`, fullPage: true });
    }
});
