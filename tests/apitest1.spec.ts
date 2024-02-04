import { test, expect } from '@playwright/test';

test.describe('Verify API call', () => {
        test('Verify response data', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users/2');
        const responseBody = await response.json();

        await expect(responseBody.data.first_name).toBe('Janet');
        await expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
        await expect(response.status()).toBe(200);

    });
});