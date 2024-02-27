import { test, expect, Browser } from "@playwright/test";
import { APIqaCart } from "../../pages/qacart-api.page";
const logPayload = { email: "newemail123@pl.pl", password: "Password1234" };
const taskPayload = { item: "To Do newemail3@email.com", isCompleted: false };
import * as fakeResponse from "../../test-data/qacart-response.json";

let token;

test.beforeEach(async ({ page, request, context }) => {
    const qacart = new APIqaCart(request, context);
    const response = await qacart.loginApi(logPayload);
    token = await response.access_token;
    await page.goto('https://todo.qacart.com/todo')
});

test('Log in and create a task', async ({ page, request }) => {
    
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
    
    // const session = await page.context().newCDPSession(page);
    // await session.send("Performance.enable")
    // //To tell the CDPsession to record performance metrics.
    // console.log("=============CDP Performance Metrics===============")
    // let performanceMetrics = await session.send("Performance.getMetrics")
    // console.log(performanceMetrics.metrics)
});

test('Log in and fake a task', async ({ page }) => {
    await page.route('https://todo.qacart.com/api/v1/tasks', async route => {
        const response = await page.request.fetch(route.request());
        let body = JSON.stringify(fakeResponse);
        await route.fulfill({
            status: 201,
            contentType: 'application/json',
            response,
            body,
            headers: { Authorization: `Bearer ${token}` },
        });
    });
    await page.goto('https://todo.qacart.com/todo')
    await expect(page.getByText('To Do newemail3@email.com')).toBeVisible();
});

test('Log in and abort during task', async ({ page }) => {
    await page.route('**/*.{jpg,png,jpeg}', route => route.abort());
    await page.pause();

});


test('Log in and continue to a link', async ({ page }) => {
    await page.route('https://todo.qacart.com/', route => route.continue({
        url: 'https://todo.qacart.com/todo'}))
});