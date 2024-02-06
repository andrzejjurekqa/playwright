import { test, expect } from '@playwright/test';
import { data } from '../test-data/importedData.json'

test.describe('Verify mock API call', () => {
    test('Verify mocked post', async ({ page }) => {
        await page.route('**/users', async (route) => {
            await route.fulfill({ data });
        })
        await page.goto('https://reqres.in/');
        await expect(page.getByText('morpheus')).toBeVisible();
    });
      test('mocks a fruit and does not call api', async ({ page }) => {
        // Mock the api call before navigating
        await page.route('*/**/api/v1/fruits', async (route) => {
          await route.fulfill({ name: 'Strawberry', id: 21 });
        });
        // Go to the page
        await page.goto('https://demo.playwright.dev/api-mocking');

        // Assert that the Strawberry fruit is visible
        await expect(page.getByText('Strawberry')).toBeVisible();
      });
})

