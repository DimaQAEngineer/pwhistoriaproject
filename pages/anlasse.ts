import { test, expect } from '@playwright/test';

export default class Anlasse {

async clickOnAnlasseSilberneHochzeit(page) {
  console.log("Click on Anlasse>Silberne Hochzeit");
  console.log("Move to li element");
  await page.hover("//*[@id='mega-menu']/ul/li[4]");
  await page.waitForTimeout(3000);
  console.log("Move to li element 3 level");
  await page.hover("//*[@id='mega-menu']/ul/li[4]/ul/li[3]");
  await page.waitForTimeout(3000);
  console.log("Perform click to link");
  await page.click("//*[@id='mega-menu']/ul/li[4]/ul/li[3]/ul/li[2]/a");
  await page.waitForTimeout(3000);
}

 async clickOnAnlasseAbschied(page) {
  console.log("Click on Anlasse>Abschied");
  console.log("Move to li element");
  await page.hover("//*[@id='mega-menu']/ul/li[4]");
  await page.waitForTimeout(3000);
  console.log("Perform click to link");
  await page.click("//*[@id='mega-menu']/ul/li[4]/ul/li[15]/a");
  await page.waitForTimeout(3000);
}

 async check15ProductItemsOnAnlassePage(page) {
  console.log("Check that 15 products items is on the Anlasse Page");
  const productItems = await page.$$("//ol[@class='products list items product-items category-list']//li[@class='item product product-item']");
  expect(productItems).toHaveLength(15);
}

 async goToTenthProduct(page) {
  console.log("Go to tenth product");
  await page.waitForSelector("//li[@class='item product product-item'][10]");
  await page.click("//li[@class='item product product-item'][10]");
  await page.waitForTimeout(3000);
}
}

// test('Click on Anlasse>Silberne Hochzeit', async ({ page }) => {
//   await clickOnAnlasseSilberneHochzeit(page);
// });

// test('Click on Anlasse>Abschied', async ({ page }) => {
//   await clickOnAnlasseAbschied(page);
// });

// test('Check that 15 products items is on the Anlasse Page', async ({ page }) => {
//   await check15ProductItemsOnAnlassePage(page);
// });

// test('Go to tenth product', async ({ page }) => {
//   await goToTenthProduct(page);
// });

