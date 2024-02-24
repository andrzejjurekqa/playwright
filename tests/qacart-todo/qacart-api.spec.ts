import { test, expect, request } from "@playwright/test";
import { APIqaCart } from "../../pages/qacart-api.page";
const regPayload = { email: "newemail3@email.com", password: "Password1234", firstName: "New Name", lastName: "New LastNAme" }
const logPayload = { email: "newemail3@email.com", password: "Password1234"};
const taskPayload = { item: "wert", isCompleted: false }; 


test('Api Login', async () => {
    const apiContext = await request.newContext();
    const qacart = new APIqaCart(apiContext, logPayload);
    qacart.loginApi();
});