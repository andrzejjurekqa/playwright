import { test, expect } from '@playwright/test';
import { RahulLoginPractice } from '../../pages/rahul-loginprac.page';

test.describe('First Playwright Test Describe', async () => {

    //test.use({ browserName: 'webkit'});
    test('@Web Browser Context-Validating Error login', async ({ page }) => {
        const loginPage = new RahulLoginPractice(page);
        await loginPage.goToLoginPrac();
        await page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
        await page.on('request', request => console.log(request.url())); //add this to other tests
        await page.on('response', response => console.log(response.url(), response.status()));
        await loginPage.pracLoginInval();
        await loginPage.usernameField.fill("");
        await loginPage.usernameField.fill("rahulshettyacademy");
        await loginPage.loginButton.click();
    });

    test('@Web UI Controls', async ({ page }) => {
        let loginPage = new RahulLoginPractice(page);
        await loginPage.goToLoginPrac();
        await loginPage.dropdown.selectOption("consult");
        await loginPage.radioButton.last().click();
        await loginPage.okPrompt.click();
        await expect(loginPage.radioButton.last()).toBeChecked();
        await loginPage.terms.click();
        await expect(loginPage.terms).toBeChecked();
        await loginPage.terms.uncheck();
        expect(await loginPage.terms.isChecked()).toBeFalsy();
        await expect(loginPage.documentLink).toHaveAttribute("class", "blinkingText");
    });

    test('Child windows hadl', async ({ browser }) => {
        const context = await browser.newContext(); //explore more newContext
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const documentLink = page.locator("[href*='documents-request']");
        const [newPage] = await Promise.all([ //!IMPORTANT fulfil both before continuing
            context.waitForEvent('page'),
            await documentLink.click() // new page is opened
        ])
        const text = await newPage.locator(".red").textContent();
        const emailArray = text!.split("@"); //!! IMPORTANT
        const domainName = emailArray[1].split(" ")[0];
        await page.locator("#username").fill(domainName);
        await page.pause();
    })
});