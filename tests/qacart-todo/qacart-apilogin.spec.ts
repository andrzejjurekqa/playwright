import { test, expect, request } from "@playwright/test";
const logPayload = { email: "newemail3@email.com", password: "Password1234" };
const taskPayload = { item: "wert", isCompleted: false };

test('Log in and create a task', async ({ page, request, context }) => {
    
    const response = await request.post('https://todo.qacart.com/api/v1/users/login',{ 
        data: { email: "newemail3@email.com", password: "Password1234" } }
    );
    const responseBody = await response.json();
    const token = await responseBody.access_token;
    const userID = await responseBody.userID;
    const firstName = await responseBody.firstName;

    await context.addCookies([
        {
            name: "access_token",
            value: token,
            url: "https://todo.qacart.com/",
        },
        {
            name: "userID",
            value: userID,
            url: "https://todo.qacart.com/",
        },
        {
            name: "firstName",
            value: firstName,
            url: "https://todo.qacart.com/",
        },
])
    let userName = 'TestName' + Math.floor(Math.random() * 1000);
    await page.goto('https://todo.qacart.com/todo')
    await page.getByTestId('add').click();
    await expect(page.getByTestId('header')).toHaveText('Create a new Todo');
    await page.locator('input').fill('To do' + userName);
    await page.getByTestId('submit-newTask').click();
    await expect(page.locator('.sc-evZas').first()).toHaveText('To do' + userName);

    await page.getByRole('checkbox').first().click();
    await expect(page.getByRole('checkbox').first()).toBeChecked();
    await page.getByTestId('delete').first().click();
    await expect(page.getByTestId('todo-item')).toHaveCount(0);
});