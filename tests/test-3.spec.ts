import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const stocks = ['CRM', 'NVDA', 'ORCL', 'TSLA', 'AMD', 'AAPL', 'SMCI', 'META', 'SNOW', 'MSFT'].sort();
const needAfterHours = true;
const needHtmlOutput = true;
const needConsoleTable = true;
const viewInBrowser = true;

test('StocksQuotes', async ({ page }) => {

  let output = '';
  const tableData = [];

  if (needHtmlOutput) {
    output += '<table border="1" cellspacing="0" cellpadding="5"><tr><th>Stock</th><th>Quote</th><th>Change</th><th>Percent</th></tr>';
  }

  for (const stock of stocks) {
    await page.goto(`https://finance.yahoo.com/quote/${stock}/`);
    const quote = await page.getByTestId('qsp-price').textContent();
    const change = await page.getByTestId('qsp-price-change').textContent();
    const percent = await page.getByTestId('qsp-price-change-percent').textContent();

    if (needHtmlOutput) {
      output += `<tr><td>${stock}</td><td>${quote}</td><td>${change}</td><td>${percent}</td></tr>`;
    } else if (needConsoleTable) {
      tableData.push({ Stock: stock, Quote: quote, Change: change, Percent: percent });
    } else {
      console.log(`${stock} : ${quote} ${change} ${percent}`);
    }

    if (needAfterHours) {
      const pquote = await page.getByTestId('qsp-post-price').textContent();
      const pchange = await page.getByTestId('qsp-post-price-change').textContent();
      const ppercent = await page.getByTestId('qsp-post-price-change-percent').textContent();

      if (needHtmlOutput) {
        output += `<tr><td>${stock} (After Hours)</td><td>${pquote}</td><td>${pchange}</td><td>${ppercent}</td></tr>`;
      } else if (needConsoleTable) {
        tableData.push({ Stock: `${stock} (After Hours)`, Quote: pquote, Change: pchange, Percent: ppercent });
      } else {
        console.log(`After Hours: ${stock} : ${pquote} ${pchange} ${ppercent}`);
      }
    }
  }

  if (needHtmlOutput) {
    output += '</table>';
    console.log(output);

    if (viewInBrowser) {
      const filePath = path.join(__dirname, 'stock_quotes.html');
      fs.writeFileSync(filePath, output, 'utf8');

      // Open the HTML file in the default browser
      exec(`open ${filePath}`); // On macOS
      // exec(`start ${filePath}`); // On Windows
      // exec(`xdg-open ${filePath}`); // On Linux
    }
  }

  if (needConsoleTable) {
    console.table(tableData);
  }

});



test('StocksQuotes2', async ({ page }) => {

  let output = '';
  const tableData = [];

  if (needHtmlOutput) {
    // Start of HTML with Tailwind CSS and table
    output += `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Stock Quotes</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100 p-10">
      <h1 class="text-2xl font-bold mb-5">Stock Quotes</h1>
      <table class="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            <th class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percent</th>
          </tr>
        </thead>
        <tbody>`;
  }

  for (const stock of stocks) {
    await page.goto(`https://finance.yahoo.com/quote/${stock}/`);
    const quote = await page.getByTestId('qsp-price').textContent();
    const change = await page.getByTestId('qsp-price-change').textContent();
    const percent = await page.getByTestId('qsp-price-change-percent').textContent();

    if (needHtmlOutput) {
      output += `
      <tr class="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
        <td class="px-6 py-4 border-b border-gray-200 text-sm">${stock}</td>
        <td class="px-6 py-4 border-b border-gray-200 text-sm">${quote}</td>
        <td class="px-6 py-4 border-b border-gray-200 text-sm">${change}</td>
        <td class="px-6 py-4 border-b border-gray-200 text-sm">${percent}</td>
      </tr>`;
    } else if (needConsoleTable) {
      tableData.push({ Stock: stock, Quote: quote, Change: change, Percent: percent });
    } else {
      console.log(`${stock} : ${quote} ${change} ${percent}`);
    }

    if (needAfterHours) {
      const pquote = await page.getByTestId('qsp-post-price').textContent();
      const pchange = await page.getByTestId('qsp-post-price-change').textContent();
      const ppercent = await page.getByTestId('qsp-post-price-change-percent').textContent();

      if (needHtmlOutput) {
        output += `
        <tr class="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
          <td class="px-6 py-4 border-b border-gray-200 text-sm">${stock} (After Hours)</td>
          <td class="px-6 py-4 border-b border-gray-200 text-sm">${pquote}</td>
          <td class="px-6 py-4 border-b border-gray-200 text-sm">${pchange}</td>
          <td class="px-6 py-4 border-b border-gray-200 text-sm">${ppercent}</td>
        </tr>`;
      } else if (needConsoleTable) {
        tableData.push({ Stock: `${stock} (After Hours)`, Quote: pquote, Change: pchange, Percent: ppercent });
      } else {
        console.log(`After Hours: ${stock} : ${pquote} ${pchange} ${ppercent}`);
      }
    }
  }

  if (needHtmlOutput) {
    // End of HTML
    output += `
        </tbody>
      </table>
    </body>
    </html>`;

    console.log(output);

    if (viewInBrowser) {
      const filePath = path.join(__dirname, 'stock_quotes.html');
      fs.writeFileSync(filePath, output, 'utf8');

      // Open the HTML file in the default browser
      exec(`open ${filePath}`); // On macOS
      // exec(`start ${filePath}`); // On Windows
      // exec(`xdg-open ${filePath}`); // On Linux
    }
  }

  if (needConsoleTable) {
    console.table(tableData);
  }
});


