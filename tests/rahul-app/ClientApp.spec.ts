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
        }
    }
    await page.locator("[routerLink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //IMPORTANT
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
});