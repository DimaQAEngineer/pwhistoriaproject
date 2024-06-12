import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.historia.net/de-de/');
  await page.getByRole('button', { name: 'Alles akzeptieren' }).click();
  await page.getByRole('button', { name: 'DE_de' }).click();
  await page.goto('https://www.historia.net/fr-fr/');
});