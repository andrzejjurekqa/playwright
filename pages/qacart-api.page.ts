import { APIRequest, BrowserContext, Page, request } from "@playwright/test";
import { faker } from "@faker-js/faker"

export class APIqaCart {
    page: Page;
    request: any;
    context: BrowserContext;

    constructor(request, context) {
        this.request = request;
        this.context = context;
    }

    async loginApi(loginPayload) {
        const logResponse = await this.request.post('https://todo.qacart.com/api/v1/users/login', {
            data: loginPayload
        });
        const loginResponseBody = await logResponse.json();
        const token = await loginResponseBody.access_token;
        const userID = await loginResponseBody.userID;
        const firstName = await loginResponseBody.firstName;
        await this.context.addCookies([
            {
                name: "access_token",
                value: token,
                url: "https://todo.qacart.com/",
            },
            {
                name: "userID",
                value: userID,
                url: "https://todo.qacart.com/",
            },
            {
                name: "firstName",
                value: firstName,
                url: "https://todo.qacart.com/",
            },
        ]);
        return loginResponseBody;
    }
}