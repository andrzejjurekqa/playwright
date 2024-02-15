import { test, expect } from '@playwright/test';
import { RahulPage } from '../pages/rahul-login.page';

test.describe('First Playwright Test Describe', async () => {
    let loginPage;
    test.beforeEach(async ({page}) => {
        loginPage = new RahulPage(page);
        await page.goto("https://sso.teachable.com/secure/9521/identity/login/password");
    });

        //test.use({ browserName: 'webkit'});
    test('@Web Browser Context-Validating Error login', async ({ browser }) => {

        const context = await browser.newContext();
        const page = await context.newPage();
        // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
        const userName = page.locator('#username');
        const signIn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a");
        page.on('request', request => console.log(request.url()));
        page.on('response', response => console.log(response.url(), response.status()));
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        //css 
        await userName.fill("rahulshetty");
        await page.locator("[type='password']").fill("learning");
        await signIn.click();
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        //type - fill
        await userName.fill("");
        await userName.fill("rahulshettyacademy");
        await signIn.click();
        console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();

        console.log(allTitles);
    });


    test('@Web UI Controls', async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator('#username');
        const signIn = page.locator("#signInBtn");
        const documentLink = page.locator("[href*='documents-request']");
        const dropdown = page.locator("select.form-control");
        await dropdown.selectOption("consult");
        await page.locator(".radiotextsty").last().click();
        await page.locator("#okayBtn").click();
        console.log(await page.locator(".radiotextsty").last().isChecked());
        await expect(page.locator(".radiotextsty").last()).toBeChecked();
        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        await expect(documentLink).toHaveAttribute("class", "blinkingText");
    });
});

/*
Rahul page that was deprecated
1. Login
2. page.waitForLoadState('networkidle');
3. page.locator(".class a").allTextContents();
3. page.locator(".class a").nth(0).textContent();
*/