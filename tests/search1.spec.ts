import { test, expect } from '@playwright/test';

test('without results on the search results page', async ({ page }) => {
    await page.goto('https://www.historia.net/de-de/');
    await page.getByRole('button', { name: 'Alles akzeptieren' }).click();
    await page.getByPlaceholder('Suche nach Geschenken').click();
    await page.getByPlaceholder('Suche nach Geschenken').fill('zeo');
    await page.getByTestId('search-link').click();
    const h1Selector = 'h1';
    const expectedText = "Suchergebnisse für: 'zeo'";
    const text = await page.$eval(h1Selector, (element: any) => element.textContent.trim());
    expect(text).toBe(expectedText);
    await page.close();
});
