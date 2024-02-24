import { test, expect, request } from "@playwright/test"


export class APICalls {
    apiContext: any;
    urlBase: string;
    loginPayload: any;

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
        this.urlBase = 'https://rahulshettyacademy.com/api/';
    };
    async loginApi() {
        const loginResponse = await this.apiContext.post(
            `${this.urlBase}ecom/auth/login`,
            { data: this.loginPayload });
        const loginResponseBody = await loginResponse.json(); //does not exist on Promise <any>
        const token = loginResponseBody.token;
        return token;
    }
    async orderApi(orderPayload) {
        let response: any = {};
        response.token = await this.loginApi();
        const orderResponse = await this.apiContext.post(
            `${this.urlBase}ecom/order/create-order`,
            { data: orderPayload, headers: { 'Authorization': response.token, 'Content-Type': 'application/json' }});
        const orderResponseBody = await orderResponse.json();
        const orderId = orderResponseBody.orders[0];
        response.orderId = orderId;
        return response;
    }
}