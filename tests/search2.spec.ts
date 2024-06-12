import { test, expect } from '@playwright/test';

test('valid request', async ({ page }) => {
  await page.goto('https://www.historia.net/de-de/');
  await page.getByRole('button', { name: 'Alles akzeptieren' }).click();
  await page.getByPlaceholder('Suche nach Geschenken').click();
  await page.getByPlaceholder('Suche nach Geschenken').fill('zeitung');
  await page.getByTestId('search-link').click();
  const h1Selector = 'h1';
  const expectedText = "Suchergebnisse für: 'zeitung'";
  await page.waitForSelector(h1Selector, { timeout: 3000 });
  const text = await page.$eval(h1Selector, (element: any) => element.textContent.trim());
  expect(text).toBe(expectedText);
  const listSelector = '.products.list.items.product-items.category-list';
  const listItemSelector = `${listSelector} li`;
  const itemsCount = await page.$$eval(listItemSelector, (elements) => elements.length);
  expect(itemsCount).toBe(12);
  await page.waitForSelector('.toolbar__sorter', { timeout: 3000 });
  await page.waitForSelector('.pager__list', { timeout: 3000 });
  await page.close();
});