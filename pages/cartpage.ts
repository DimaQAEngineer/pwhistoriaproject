import { expect, test } from '@playwright/test';

export default class Anlasse {
async isCartPageOpenAndEmpty(page) {
  console.log("Is cart page open and empty");
  await page.waitForSelector("//*[@class='cart-empty-container']");
  const cartText = await page.$eval("//*[@class='cart-empty-container']", el => el.textContent);
  expect(cartText).toContain("Ihr Warenkorb ist");
}

async clickOnWeitereinkaufenButton(page) {
  console.log("Click on Weiter einkaufen button");
  await page.click("//button/a");
}

async checkTheCartIconIsOnThePage(page) {
  console.log("Check The Datafinder is on the home page");
  await page.waitForSelector("//*[@alt='Warenkorb']");
  const cartIcon = await page.isVisible("//*[@alt='Warenkorb']");
  expect(cartIcon).toBeTruthy();
}

async removeTwoProductsMinusMinus(page) {
  console.log("Remove two products - minus minus");
  await page.waitForSelector("//*[@id='shopping-cart-table']/section/div[2]/div[1]/div[2]/div/button[1]");
  await page.click("//*[@id='shopping-cart-table']/section/div[2]/div[1]/div[2]/div/button[1]");
  await page.click("//*[@id='shopping-cart-table']/section/div[2]/div[1]/div[2]/div/button[1]");
  await page.click("//*[@id='shopping-cart-table']/div/button");
}

async proceedToCheckout(page) {
  console.log("Click on Proceed to checkout button");
  await page.waitForSelector("//*[@id='maincontent']/div[2]/div/div/div[1]/div[1]/button");
  await page.click("//*[@id='maincontent']/div[2]/div/div/div[1]/div[1]/button");
}
}
// test('Is cart page open and empty', async ({ page }) => {
//   await isCartPageOpenAndEmpty(page);
// });

// test('Click on Weiter einkaufen button', async ({ page }) => {
//   await clickOnWeitereinkaufenButton(page);
// });

// test('Check The Cart Icon Is On The Page', async ({ page }) => {
//   await checkTheCartIconIsOnThePage(page);
// });

// test('Remove two products - minus minus', async ({ page }) => {
//   await removeTwoProductsMinusMinus(page);
// });

// test('Proceed to checkout', async ({ page }) => {
//   await proceedToCheckout(page);
// });
