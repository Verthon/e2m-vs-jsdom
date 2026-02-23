import { test, expect } from '@playwright/test';

test.describe('patient appointment booking process', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/create-appointment');
    await expect(
      page.getByRole('heading', { name: 'Choose Specialty', level: 2 }),
    ).toBeVisible();
  });

  test('patient books an appointment by selecting specialty, doctor then time slot', async ({
    page,
  }) => {
    const specialtiesGroup = page.getByRole('radiogroup');
    await specialtiesGroup.locator('label').first().click();

    await page.getByRole('button', { name: 'Next' }).click();

    await expect(
      page.getByRole('heading', { name: 'Recommended Doctors', level: 2 }),
    ).toBeVisible();

    const doctorsGroup = page.getByRole('radiogroup');
    await doctorsGroup.locator('label').first().click();

    await page.getByRole('button', { name: 'Next' }).click();
  });

  test('should not persist the chosen doctor when user go back and change the specialty', async ({
    page,
  }) => {
    const specialtiesGroup = page.getByRole('radiogroup');
    await specialtiesGroup.locator('label').first().click();

    await page.getByRole('button', { name: 'Next' }).click();

    await expect(
      page.getByRole('heading', { name: 'Recommended Doctors', level: 2 }),
    ).toBeVisible();

    const doctorsGroup = page.getByRole('radiogroup');
    await doctorsGroup.locator('label').first().click();

    await expect(page.getByRole('button', { name: 'Next' })).not.toHaveAttribute('aria-disabled');

    await page.getByRole('button', { name: 'Back' }).click();

    await expect(
      page.getByRole('heading', { name: 'Choose Specialty', level: 2 }),
    ).toBeVisible();

    const specialtiesGroupAgain = page.getByRole('radiogroup');
    await specialtiesGroupAgain.locator('label').nth(1).click();

    await page.getByRole('button', { name: 'Next' }).click();

    await expect(
      page.getByRole('heading', { name: 'Recommended Doctors', level: 2 }),
    ).toBeVisible();

    await expect(page.getByRole('button', { name: 'Next' })).toHaveAttribute('aria-disabled', 'true');
  });
});
