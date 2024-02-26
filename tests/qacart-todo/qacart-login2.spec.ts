import { expect, test } from "@playwright/test";
import { faker } from "@faker-js/faker";

let loginData = { email: "newemail3@email.com", password: "Password1234" };
let registrationData = { email: Math.floor(Math.random() * 10000) + '@todotest.com', password: "Password1234", firstName: "Dandrzej", lastName: "Durek" };
let registrationInvData = { email: 'newemail3@email.com', password: "Password1234", firstName: "Dandrzej", lastName: "Durek" };
let invLoginData = { email: "newemail3@email.com", password: "asdasdasdas" };
let baseUrl = 'https://todo.qacart.com/';





test.describe('Login Api Call', () => {
    test('Send Valid Login', async ({ request, context, page }) => {
        let response = await request.post(`${baseUrl}api/v1/users/login`, {
            data: loginData
        });
        let responseBody = await response.json();
        let token = responseBody.access_token;
        let userID = responseBody.userID;
        let firstName = responseBody.firstName;

        await context.addCookies([
            {
                name: 'access_token',
                value: token,
                url: `${baseUrl}`,
            }, {
                name: 'userID',
                value: userID,
                url: `${baseUrl}`,
            }, {
                name: 'firstName',
                value: firstName,
                url: `${baseUrl}`,
            },
        ]);
        await page.goto(`${baseUrl}todo`)
    });

    test('Send Invalid Login', async ({ request, page }) => {
        let response = await request.post(`${baseUrl}api/v1/users/login`, {
            data: invLoginData
        });
        let responseBody = await response.json();
        await expect(responseBody.message).toBe('The email and password combination is not correct, please fill a correct email and password');
    });

    test('Valid Register and save data', async ({ request, context, page }) => {
        let registerResponse = await request.post('https://todo.qacart.com/api/v1/users/register', {
            data: registrationData
        });
        let registerResponseBody = await registerResponse.json();
        let token = registerResponseBody.access_token;
        let userID = registerResponseBody.userID;
        let firstName = registerResponseBody.firstName;

        await context.addCookies([
            {
                name: 'access_token',
                value: token,
                url: `${baseUrl}`
            }, {
                name: 'userID',
                value: userID,
                url: `${baseUrl}`
            }, {
                name: 'firstName',
                value: firstName,
                url: `${baseUrl}`
            },
        ]);
        await page.goto(`${baseUrl}todo`);
        await expect(page.getByTestId('welcome')).toContainText('Dandrzej');
    });
    test('Invalid registration', async ({ request }) => {
        let response = await request.post('https://todo.qacart.com/api/v1/users/register', {
            data: registrationInvData
        });
        let responseBody = await response.json();

        await expect(responseBody.message).toBe('Email is already exists in the Database');
    });
});