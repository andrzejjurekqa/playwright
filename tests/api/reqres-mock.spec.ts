import { test, expect } from '@playwright/test';
import * as fakeResponse from '../../test-data/reqres-post.json'

test.describe('Verify mock API call', () => {
    test('Verify mocked post', async ({ page }) => {
        await page.route('https://reqres.in/api/users', async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeResponse)
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                response,
                body,
            });
        });
        await page.goto('https://reqres.in/api/users');
        await expect(page.getByText('Morpheus')).toBeVisible();
        await page.pause();
        page.on('request', request => console.log(request.url()));
        page.on('response', response => console.log(response.url(), response.status()));
    });
});