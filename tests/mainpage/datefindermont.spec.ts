import { test, expect } from '@playwright/test';
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

    // Отримання обраного місяця з селекта
    const monthSelect = await page.$('select[name="month"] > option[selected="selected"]');
    
    // Перевірка, чи знайдено елемент monthSelect
    if (!monthSelect) {
        console.log('Помилка: селект місяця не знайдено.');
        return; // Вихід із функції, якщо елемент не знайдено
    }

    // Отримання значення атрибута 'value' та перевірка, чи воно не є null
    const selectedMonth = await monthSelect.getAttribute('value');
    if (selectedMonth === null) {
        console.log('Помилка: значення атрибута "value" не знайдено.');
        return; // Вихід із функції, якщо значення атрибута не знайдено
    }

    // Перетворення обраного місяця на число для порівняння
    const selectedMonthNumber = parseInt(selectedMonth, 10);

    // Порівняння отриманого місяця з сьогоднішнім
    expect(selectedMonthNumber).toBe(parseInt(currentMonth, 10));
    await page.close();
});



