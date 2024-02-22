import { test, expect } from "@playwright/test"

test('Get by Testing', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice');
    //getby good for checkboxes, radio buttons and dropdowns
    await page.getByText('Name')
    await page.getByPlaceholder('Password').fill('NewPassword');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Male');
    await expect(page.getByLabel('Student').isEnabled()).toBeTruthy();
    await page.getByLabel('Student').click();
    await expect(page.getByLabel('Employed').isEnabled()).toBeTruthy();
    await page.getByLabel('Employed').click();
    await expect(page.getByLabel('Entrepreneur').isDisabled()).toBeTruthy();

    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole('link', { name: 'shop' }).click();
    await page.locator('app-card').filter({ hasText: 'Nokia Edge' }).getByRole('button').click();
    await page.locator('btn-primary').click();})

test('Calendar test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const month = '6';
    const day = '16';
    const year = '2028';
    const expectedList = [month, day, year];
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label__labelText--from').click();
    await page.locator('.react-calendar__navigation__label__labelText--from').click();
    await page.getByText(year.toString()).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(month) - 1).click();
    await page.locator('//abbr[text()="' + day + '"]').click();
    const inputs = await page.locator(".react-date-picker__inputGroup input");
    for (let index = 0; index < Number(inputs); index++) {
        const value = inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]);
    }
    await expect(page.locator('.react-date-picker__inputGroup__month')).toHaveValue(month);
    await expect(page.locator('.react-date-picker__inputGroup__day')).toHaveValue(day);
    await expect(page.locator('.react-date-picker__inputGroup__year')).toHaveValue(year);


});