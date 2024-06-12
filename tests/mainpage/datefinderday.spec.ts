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

// Перевірка чи об'єкт page існує
test('test', async ({ page }) => {
    const mainPage = new MainPage(page); 
    await mainPage.openbaseURL(); // Відкриваємо головну сторінку
  
    await mainPage.acceptAllCookies(); // Приймаємо куки
    // Отримання сьогоднішньої дати
    const today = new Date();
    const currentDay = today.getDate().toString().padStart(2, '0'); // Поточне число (наприклад, "07")

    // Отримання обраного дня з селекта
    const daySelect = await page.$('select[name="day"] > option[selected="selected"]');
    
    // Перевірка, чи знайдено елемент daySelect
    if (!daySelect) {
        console.log('Помилка: селект дня не знайдено.');
        return; // Вихід із функції, якщо елемент не знайдено
    }

    // Отримання значення атрибута 'value' та перевірка, чи воно не є null
    const selectedDay = await daySelect.getAttribute('value');
    if (selectedDay === null) {
        console.log('Помилка: значення атрибута "value" не знайдено.');
        return; // Вихід із функції, якщо значення атрибута не знайдено
    }

    // Порівняння отриманого дня з сьогоднішнім
    expect(parseInt(selectedDay)).toBe(parseInt(currentDay));
    
    await page.close();
});
