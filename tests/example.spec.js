// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/GSB Frais/);
});

test('connexion link', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Connexion' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Connexion' })).toBeVisible();
});


test ('Login with valid credentials', async ({ page }) =>{
  await page.goto('http://localhost:3000/login');

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test ('Login with valid credentials', async ({ page }) =>{
  await page.goto('http://localhost:3000/login');

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});


test ('False credentials and True credentials', async ({ page }) =>{

  await page.goto('http://localhost:3000/login');

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');


  await expect(page).toHaveURL('http://localhost:3000/login');
});



test ('Refresh dashboard page', async ({page})=>{
    await page.goto('http://localhost:3000/login');

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  await page.reload();

  await expect(page).toHaveURL('http://localhost:3000/dashboard');
});

test ('Logout', async ({ page }) =>{
  await page.goto('http://localhost:3000/login');

  await page.fill('input[name="login"]', 'Andre');
  await page.fill('input[name="password"]', 'secret');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  await page.click('button[type="deco"]');

  await expect(page).toHaveURL('http://localhost:3000/login');

});