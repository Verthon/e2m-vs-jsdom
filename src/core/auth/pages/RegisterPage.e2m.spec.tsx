import { test, expect } from '@playwright/test';

test.describe('RegisterPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signup');
  });

  test('redirects to homepage after successful registration', async ({ page }) => {
    await page.getByLabel(/username/i).fill('johndoe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/^password$/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('password123');
    
    await page.getByRole('button', { name: /sign up/i }).click();

    await expect(page).toHaveURL('/');
  });

  test('displays validation error for invalid email', async ({ page }) => {
    await page.getByLabel(/username/i).fill('johndoe');
    await page.getByLabel(/email/i).fill('invalidemail');
    await page.getByLabel(/^password$/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('password123');
    
    // Validation might happen on blur or on submit
    await page.getByRole('button', { name: /sign up/i }).click();

    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
  });

  test('displays validation error for missing required fields', async ({ page }) => {
    await page.getByRole('button', { name: /sign up/i }).click();

    await expect(page.getByText(/username is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test('displays validation error for password mismatch', async ({ page }) => {
    await page.getByLabel(/username/i).fill('johndoe');
    await page.getByLabel(/email/i).fill('john@example.com');
    await page.getByLabel(/^password$/i).fill('password123');
    await page.getByLabel(/confirm password/i).fill('differentpassword');
    
    await page.getByRole('button', { name: /sign up/i }).click();

    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });
});
