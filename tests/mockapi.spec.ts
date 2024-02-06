import { test, expect } from '@playwright/test';

test.describe('Verify mock API call', () => {
    test('Verify mocked post', async ({ page }) => {
        await page.route('**/api/users', async (route) => {
            const json = [{ "data": {'name': 'morpheus', 'job': 'leader'}}];
            await route.fulfill({ json });
        })
        await page.goto('https://reqres.in');
        await expect(page.getByText('morpheus')).toBeVisible();
    })
      test('mocks a fruit and does not call api', async ({ page }) => {
        // Mock the api call before navigating
        await page.route('*/**/api/v1/fruits', async (route) => {
          const json = [{ name: 'Strawberry', id: 21 }];
          await route.fulfill({ json });
        });
        // Go to the page
        await page.goto('https://demo.playwright.dev/api-mocking');

        // Assert that the Strawberry fruit is visible
        await expect(page.getByText('Strawberry')).toBeVisible();
      });
})

