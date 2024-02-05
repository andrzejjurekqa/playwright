import { test, expect } from '@playwright/test';

test.describe('Verify API call', () => {

    const urlBase = 'https://reqres.in/api/';
    test('Verify get', async ({ request }) => {
        const response = await request.get(`${urlBase}users/2`);
        const responseBody = await response.json();

        expect(responseBody.data.first_name).toBe('Janet');
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
        expect(response.status()).toBe(200);
    })
    test('Verify post', async ({ request }) => {
        const response = await request.post(`${urlBase}users`, {
            "data": {
                'name': 'Jebediah', 'job': 'leader'
            }
        })
        const responseBody = await response.json();

        expect(responseBody.name).toBe('Jebediah');
        expect(responseBody.job).toBe('leader');
        expect(response.status()).toBe(201);
    })
    test('Verify delete', async ({ request }) => {
        const response = await request.delete(`${urlBase}users`, {
            //change into imported json
            "data": {
            "id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}
        })

        expect(response.status()).toBe(204);
    })
    test('Verify put', async ({ request }) => {
        const response = await request.put(`${urlBase}users/2`, {
            "data": {
                'name': 'Jebediah', 'job': 'leader'
            }
        })
        const responseBody = await response.json();

        expect(responseBody.name).toBe('Jebediah');
        expect(responseBody.job).toBe('leader');
        expect(response.status()).toBe(200);
    })
    test('Verify patch', async ({ request }) => {
        const response = await request.patch(`${urlBase}users/2`, {
            "data": {
                'name': 'Jebediah', 'job': 'leader'
            }
        })
        const responseBody = await response.json();

        expect(responseBody.name).toBe('Jebediah');
        expect(responseBody.job).toBe('leader');
        expect(response.status()).toBe(200);
    })
    test('Verify correct login', async ({ request }) => {
        const response = await request.post(`${urlBase}login`, {
            "data": {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })
        const responseBody = await response.json();

        expect(responseBody.token).toBe('QpwL5tke4Pnpja7X4');
        expect(response.status()).toBe(200);
    })
    test('Verify incorrect login', async ({ request }) => {
        const response = await request.post(`${urlBase}login`, {
            "data": {
                "email": "eve.holt@reqres.in",
            }
        })
        const responseBody = await response.json();

        expect(responseBody.error).toBeTruthy();
        expect(response.status()).toBe(400);
    })
});