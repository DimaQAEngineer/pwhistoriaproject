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
  
    const h3Elements = await page.$$('h3'); // Отримуємо елементи h3 на сторінці
    let isH3Correct = false;
    for (const h3Element of h3Elements) {
      const text = await h3Element.innerText(); // Використовуємо метод innerText замість textContent
      if (text && text.trim() === 'Beliebte Geschenke') { // Очікуваний заголовок
        isH3Correct = true;
        break;
      }
    }
    if (!isH3Correct) {
      console.log('Title h3 is wrong!');
      throw new Error('Title h3 is wrong!');
    }
  
    await page.close();
  });