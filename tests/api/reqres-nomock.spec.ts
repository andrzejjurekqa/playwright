import { test, expect } from '@playwright/test';
import * as data from '../../test-data/reqres-put.json';
import * as deletedData from '../../test-data/reqres-delete.json';

test.describe('@API Verify API call', () => {

    const urlBase = 'https://reqres.in/api/';
    test('Verify get', async ({ request }) => {
        const response = await request.get(`${urlBase}users/2`);
        const responseBody = await response.json();

        expect(responseBody.data.first_name).toBe('Janet');
        expect(responseBody.data.email).toBe('janet.weaver@reqres.in');
        expect(response.status()).toBe(200);
    })
    test('Verify post', async ({ request }) => {
        const response = await request.post(`${urlBase}users`,
            { data: { 'name': 'Jebediah', 'job': 'leader' } })
        const responseBody = await response.json();

        expect(responseBody.name).toBe('Jebediah');
        expect(responseBody.job).toBe('leader');
        expect(response.status()).toBe(201);
    })
    test('Verify delete', async ({ request }) => {
        const response = await request.delete(`${urlBase}users`, {
            "data": deletedData
        })
        expect(response.status()).toBe(204);
    })
    test('Verify put', async ({ request }) => {
        const response = await request.put(`${urlBase}users/2`, {
            "data": { 'name': 'Jebediah', 'job': 'leader' }
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
                "email": "eve.holt@reqres.in"
            }
        })
        const responseBody = await response.json();

        expect(responseBody.error).toBeTruthy();
        expect(response.status()).toBe(400);
    })
    test('Verify sending data defined elsewhere', async ({ request }) => {
        const response = await request.put(`${urlBase}users/2`, {
            "data": data
        })
        const responseBody = await response.json();

        expect(responseBody.name).toBe('Jebediah');
        expect(responseBody.job).toBe('leader');
        expect(response.status()).toBe(200);
    })
});