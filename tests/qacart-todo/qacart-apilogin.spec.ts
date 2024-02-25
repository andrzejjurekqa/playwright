import { test, expect, request } from "@playwright/test";
import { APIqaCart } from "../../pages/qacart-api.page";
const logPayload = { email: "newemail3@email.com", password: "Password1234" };
const taskPayload = { item: "To Do newemail3@email.com", isCompleted: false };


test('Log in and create a task', async ({ page, request, context }) => {
    
    const qacart = new APIqaCart(request, context);
    const response = await qacart.loginApi(logPayload);
    const token = await response.access_token;
    await page.goto('https://todo.qacart.com/todo');
    await expect(page.locator('.sc-dIouRR')).toContainText('New Nam');

    const taskResponse = await request.post('https://todo.qacart.com/api/v1/tasks', {
        data: taskPayload,
        headers: { Authorization: `Bearer ${token}` },
    });
    const taskResponseBody = await taskResponse.json();
    let taskID = await taskResponseBody._id;
    await page.goto('https://todo.qacart.com/todo');
    await expect(page.getByTestId('todo-text').first()).toHaveText('To Do newemail3@email.com');
    

    const taskPutResponse = await request.put(`https://todo.qacart.com/api/v1/tasks/${taskID}`, {
        data: { item: "To Do newemail3@email.com", isCompleted: true },
        headers: { Authorization: `Bearer ${token}` },
    });
    const taskPutResponseBody = await taskPutResponse.json();
    await page.goto('https://todo.qacart.com/todo');
    await expect(page.getByTestId('complete-task').first()).toBeChecked();

    const taskDelResp = await request.delete(`https://todo.qacart.com/api/v1/tasks/${taskID}`, {
        data: { item: "To Do newemail3@email.com", isCompleted: true },
        headers: { Authorization: `Bearer ${token}` },
    });
    const taskDelRespBody = await taskDelResp.json();
    await page.goto('https://todo.qacart.com/todo');
    await expect(page.getByTestId('todo-text')).toHaveCount(0);

    const getResponse = await request.get('https://todo.qacart.com/api/v1/tasks', {
            headers: { Authorization: `Bearer ${token}` },});
    const getResponseBody = await getResponse.json();
    const tasks = await getResponseBody.tasks;
    await (expect(tasks)).toStrictEqual([]);
});

test('Log in and fake a task', async ({ page, request, context }) => {
    // page.addInitScript(value => {
    //     window.localStorage.setItem('token', value);
    // }, response.token);
    const qacart = new APIqaCart(request, context);
    const response = await qacart.loginApi(logPayload);
    const token = await response.access_token;
    await page.goto('https://todo.qacart.com/todo');
    await expect(page.locator('.sc-dIouRR')).toContainText('New Nam');

});

test('Log in and abort during task', async ({ page, request, context }) => {


});


test('Log in and continue to nonexistent link', async ({ page, request, context }) => {


});