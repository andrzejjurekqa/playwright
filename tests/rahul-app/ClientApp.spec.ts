import { test, expect} from "@playwright/test"

test('Client App Login', async ({page}) => {
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator('#userPassword').fill('Iamking@000');
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i){
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator('text= Add To Cart'). click();
            break;
        };
    };
    await expect(page.locator('div')).toHaveText('Product Added To Cart');
    await page.locator("[routerLink*='cart']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //IMPORTANT
    await expect(bool).toBeTruthy();
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
    await expect(page.locator('div')).toHaveText('Order Placed Successfully');
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
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderNumber = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderNumber);
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
    await expect(page.locator('col-text')).toHaveText(orderNumber!);
    
});