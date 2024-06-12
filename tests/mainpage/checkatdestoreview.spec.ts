import { test, expect } from '@playwright/test';
import { chromium, Page } from 'playwright';

import Anlasse from '../../pages/anlasse';
import CartPage from '../../pages/cartpage';
import MainPage from '../../pages/mainpage';

const anlasse = new Anlasse();
const cartpage = new CartPage();

const today = new Date();
const currentDay = today.getDate().toString().padStart(2, '0'); // Поточне число (наприклад, "07")
const currentMonth = (today.getMonth() + 1).toString().padStart(2, '0'); // Поточний місяць (наприклад, "06")

test('test', async ({ page }) => {
  const mainPage = new MainPage(page);
  await mainPage.openbaseURL(); // Відкриваємо головну сторінку
  await mainPage.acceptAllCookies(); // Приймаємо куки
  await mainPage.clickonthestoreswitcher();
  await mainPage.switchtoatdestoreview();
  await page.waitForTimeout(2000);

  const h1Elements = await page.$$('h1'); // Отримуємо елементи h1 на сторінці
  let isH1Correct = false;
  for (const h1Element of h1Elements) {
    const text = await h1Element.innerText(); // Використовуємо метод innerText замість textContent
    if (text && text.trim() === 'Historische Zeitungen & Zeitschriften verschenken') { // Очікуваний заголовок
      isH1Correct = true;
      break;
    }
  }
  if (!isH1Correct) {
    console.log('Title h1 is wrong!');
    throw new Error('Title h1 is wrong!');
  }

  try {
    await page.waitForURL('https://www.historia.net/at-de/'); // Перевіряємо URL
    console.log('URL is expected');
  } catch (error) {
    console.error('URL is wrong', await page.url()); // Виводимо фактичний URL, якщо виникла помилка
    throw new Error('Expected and Actual URLs are differend'); // Викидаємо помилку
  } finally {
    await page.close();
  }
});