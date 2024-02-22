import { Page } from "@playwright/test"
import { RahulDashboardPage } from "./rahul-dashboard.page";
import { RahulLoginPage } from "./rahul-login.page";
import { RahulCartPage } from "./rahul-cart.page";
import { RahulCheckoutPage } from "./rahul-checkout.page";

export class POManager {
    page: Page;
    dashboardPage;
    loginPage;
    cartPage;
    checkoutPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new RahulLoginPage(this.page);
        this.dashboardPage = new RahulDashboardPage(this.page);
        this.cartPage = new RahulCartPage(this.page);
        this.checkoutPage = new RahulCheckoutPage(this.page);
    }
    async getLoginPage(){
        return this.loginPage.goToLogin();
    }
}