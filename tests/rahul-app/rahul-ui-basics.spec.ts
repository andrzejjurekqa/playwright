import { test, expect } from '@playwright/test';
import { RahulPage } from '../../pages/rahul-login.page';

test.describe('First Playwright Test Describe', async () => {

    // test.beforeEach(async ({ page}) => {});

    //test.use({ browserName: 'webkit'});
    test('@Web Browser Context-Validating Error login', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        let loginPage = new RahulPage(page);
        // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
        page.on('request', request => console.log(request.url())); //add this to other tests
        page.on('response', response => console.log(response.url(), response.status()));
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        console.log(await page.title());
        //css 
        await loginPage.usernameField.fill("rahulshetty");
        await loginPage.passwordField.fill("learning");
        await loginPage.loginButton.click();
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        //type - fill
        await loginPage.usernameField.fill("rahulshettyacademy");
        await loginPage.loginButton.click();
        console.log(await loginPage.cardTitles.first().textContent());
        console.log(await loginPage.cardTitles.nth(1).textContent());
        const allTitles = await loginPage.cardTitles.allTextContents();

        console.log(allTitles);
    });

    test('@Web UI Controls', async ({ page }) => {
        let loginPage = new RahulPage(page);
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
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

    test('Child windows hadl', async ({ browser }) => {
        const context = await browser.newContext(); //explore more newContext
        const page = await context.newPage();
        let loginPage = new RahulPage(page);
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const [newPage] = await Promise.all([ //!IMPORTANT fulfil both before continuing
            context.waitForEvent('page'),
            await loginPage.documentLink.click() // new page is opened
        ])
        const text = await newPage.locator(".red").textContent();
        const emailArray = text!.split("@"); //!! IMPORTANT
        const domainName = emailArray[1].split(" ")[0];
        console.log(domainName);
        await loginPage.usernameField.fill(domainName);
        await page.pause();
    })
});

/*
Rahul page that was deprecated
1. Login
2. page.waitForLoadState('networkidle');
3. page.locator(".class a").allTextContents();
3. page.locator(".class a").nth(0).textContent();
*/

//Listen for new page to open
//3 states of promise: pending, rejected, fulfilled