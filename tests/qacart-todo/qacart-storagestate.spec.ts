import { expect, test } from "playwright/test";

test('Storage State for ToDo', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://todo.qacart.com/login');
    await page.locator('#email').fill('newemail3@email.com');
    await page.locator('#password').fill('Password1234');
    await page.locator('#submit').click();
    await page.waitForLoadState('networkidle');
    const storageBody = await context.storageState({ path: 'state2.json' });
    console.log(storageBody);
    let webContext = await browser.newContext({ storageState: 'state2.json' });
    let page2 = await webContext.newPage();
    await page2.goto('https://todo.qacart.com/todo');
    await expect(page2.getByTestId('welcome')).toContainText('Dandrzej');
});