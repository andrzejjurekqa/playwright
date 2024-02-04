import { test, expect } from '@playwright/test';

test.describe('Verify API call', () => {

    const urlBase = 'https://reqres.in/api/';
    test('Verify get', async ({ request }) => {
        const response = await request.get(`${urlBase}users/2`);
        const responseBody = await response.json();

        expect(responseBody.data.first_name).toBe('Janet');
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
        expect(response.status()).toBe(200);
    });
    test('Verify post', async ({request}) => {
        const response = await request.post(`${urlBase}users`, {
            'email': 'eve.holt@reqres.in', 'password': 'pistol'
        })
        expect(response.status()).toBe(201);
    });
    test('Verify delete', async ({request}) => {
        const response = await request.delete(`${urlBase}users`, {
        "data":{"id":2,"email":"janet.weaver@reqres.in","first_name":"Janet","last_name":"Weaver","avatar":"https://reqres.in/img/faces/2-image.jpg"},"support":{"url":"https://reqres.in/#support-heading","text":"To keep ReqRes free, contributions towards server costs are appreciated!"}
        })
        expect(response.status()).toBe(204);
    })
    test('Verify put', async ({request}) => {
        const response = await request.put(`${urlBase}users/2`, {
            "name": "morpheus", "job": "zion resident"
        })
        expect(response.status()).toBe(200);
    })
    test('Verify patch', async ({request}) => {
        const response = await request.patch(`${urlBase}users/2`, {
            "name": "morpheus", "job": "zion resident"
        })
        expect(response.status()).toBe(200);
    })
});