import { expect, test, request } from "@playwright/test";

//Login UI => collect all information
//test => cart order, order details, order history

let webContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });
});



test('@API Test Case 2', async () => {
    const page = await webContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');

    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    const titles = await page.locator('.card-body b').allTextContents();
    //console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        };
    };
    await page.locator("[routerLink*='cart']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially('Ind');
    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();
    for (let i = 0; i < await dropdown.locator('button').count(); ++i) {
        if (await dropdown.locator('button').nth(i).textContent() === ' India') {
            await dropdown.locator('button').nth(i).click();
            break;
        };
    };
    await page.locator('input[type="text"]').first().clear();
    await page.locator('input[type="text"]').first().fill('4542 9931 1234 2293');
    await page.getByRole('combobox').first().selectOption('07');
    await page.getByRole('combobox').nth(1).selectOption('30');
    await page.locator('input[type="text"]').nth(1).fill('121');
    await page.locator('input[type="text"]').nth(2).fill('Andrzej Jurek');
    await page.locator('input[type="text"]').nth(2).press('Tab');
    await page.locator('input[name="coupon"]').fill('cheatcheap');
    //await page.locator('text=Apply Coupon').first().click();
    await expect(page.locator('.user__name [type="text"]').first()).toHaveText('anshika@gmail.com');
    await page.locator("text=PLACE ORDER").click();
    await expect(page.locator('div').filter({ hasText: 'Order Placed Successfully' }).nth(2)).toBeVisible();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderNumber = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    //console.log(orderNumber);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderNumber!.includes(rowOrderId!)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    };
    await page.locator('.tagline').waitFor();
    await expect(page.locator('.tagline')).toHaveText('Thank you for Shopping With Us');
    function splitMulti(str, tokens): [] {
        var tempChar = tokens[0]; // We can use the first token as a temporary join character
        for (var i = 1; i < tokens.length; i++) {
            str = str.split(tokens[i]).join(tempChar);
        }
        str = str.split(tempChar);
        return str;
    };
    const newOrderNumber = splitMulti(orderNumber!, ['|', ' ']).slice(3, 4).toString();//!! IMPORTANT
    console.log(newOrderNumber);
    await expect(page.locator('.col-text')).toHaveText(newOrderNumber!);

});