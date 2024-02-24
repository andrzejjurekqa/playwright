import { expect, request } from "@playwright/test";

export class APIqaCart {
    apiContext: any;
    loginPayload: any;
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;

    };

    async loginApi()  {
        let token;
        const response = await this.apiContext.post('https://todo.qacart.com/api/v1/users/login', {
            data: this.loginPayload
        });
        const responseBody = await response.json();
        await expect(response.status).toBe(200);
        token = responseBody.access_token;
        return token;
    }
}