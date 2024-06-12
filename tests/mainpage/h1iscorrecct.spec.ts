import { test, expect } from '@playwright/test';
import { chromium, Page } from 'playwright';

import Anlasse from '../../pages/anlasse';
import CartPage from '../../pages/cartpage';
import MainPage from '../../pages/mainpage';

const anlasse = new Anlasse();
const cartpage = new CartPage();


test('test', async ({ page }) => {
    const mainPage = new MainPage(page); 
    await mainPage.openbaseURL(); // Відкриваємо головну сторінку
  
    await mainPage.acceptAllCookies(); // Приймаємо куки
  
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
  
    await page.close();
  });