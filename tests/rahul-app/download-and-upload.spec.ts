import { readExcel, writeExcel } from '../../pages/excel-download';
import { test, expect } from "@playwright/test";

test('Download and change', async ({ page }) => {
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/index.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcel(textSearch, updateValue, { rowChange: 0, colChange: 2 }, '/Users/AJ/downloads/download.xlsx');
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles('/Users/AJ/downloads/download.xlsx');
    const textLocator = await page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({ has: textLocator });
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);
});