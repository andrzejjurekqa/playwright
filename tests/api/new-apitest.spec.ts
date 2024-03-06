import { test, expect } from "@playwright/test";
const postData = { name: "morpheus", job: "leader" };
const patchData = { name: "thadeus", job: "feeder" };

const mockData = {
    "name": "Neo",
    "job": "theOne",
    "id": "178",
    "createdAt": "2024-03-05T21:22:53.525Z"
};

test('Test Reqres get api', async ({ request }) => {
    const getResponse = await request.get('https://reqres.in/api/users?page=2');
    const getResponseBody = await getResponse.json();
});

test('Test Reqres post api', async ({ request, playwright }) => {
    const postResponse = await request.post('https://reqres.in/api/users', {
        data: postData
    });
    const postResponseBody = await postResponse.json();
    await expect(postResponse.status()).toBe(201);
    await expect(postResponseBody.name).toBe('morpheus');
});

test('Reqres mock api', async ({ page }) => {
    await page.route('https://reqres.in/api/users', async route => {
        const response = await page.request.fetch(route.request());
        await route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(mockData),
        });
    });
});

test('mock', async ({ page }) => {
    await page.route('https://reqres.in/api/users', async route => {
        const responseBody1 = await page.request.fetch(route.request());
        await route.fulfill({
            contentType: 'application/json',
            body: JSON.stringify(mockData),
        });
    });
});

test('Abort', async ({ page }) => {
    await page.route('https://reqres.in/api/users', async route => {
        await route.abort();
    });
});

test('Update', async ({ request }) => {
    const updateResponse = await request.patch('https://reqres.in/api/users/2', { data: patchData });
    const updateResponseBody = await updateResponse.json();
    await expect(updateResponse.status()).toBe(200);
    await expect(updateResponseBody.job).toBe('feeder');
});

test('Delete', async ({ request }) => {
    const deleteResponse = await request.delete('https://reqres.in/api/users/2');
    await expect(deleteResponse.status()).toBe(204);
});

test('Delayed get', async ({ request }) => {
    const responseDel = await request.get('https://reqres.in/api/users?delay=3');
    const responseDelBody = await responseDel.json();
    await expect(responseDelBody.page).toBe(1);
    await expect(responseDelBody.support.text).toBe('To keep ReqRes free, contributions towards server costs are appreciated!');
});