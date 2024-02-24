import { expect, request } from "@playwright/test";

export class APIqaCart {
    apiContext: any;
    payload: any;

    constructor(apiContext, payload) {
        this.apiContext = apiContext;
        this.payload = payload;
    };

    async loginApi() {
        const logResponse = await this.apiContext.post('https://todo.qacart.com/api/v1/users/login', {
            data: this.payload
        });
        const loginResponseBody = await logResponse.json();
        console.log(loginResponseBody);
        const token = loginResponseBody.access_token;
        return token;
    }
    async registrationApi() {
        const regResponse = await this.apiContext.post('https://todo.qacart.com/api/v1/users/register', {
            data: this.payload
        });
        const regiResponseBody = await regResponse.json();
        console.log(regiResponseBody);
        const token = regiResponseBody.access_token;
        return token;
    }
}