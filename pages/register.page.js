import {expect} from "@playwright/test";
import { URLs } from "../config";

export class RegisterPage {


    async registerUser(page, username, password) {
        await page.locator("[name='customer.firstName']").fill('John');
        await page.locator("[name='customer.lastName']").fill('Doe');
        await page.locator("[name='customer.address.street']").fill('123 Street');
        await page.locator("[name='customer.address.city']").fill('AnyCity');
        await page.locator("[name='customer.address.state']").fill('AnyState');
        await page.locator("[name='customer.address.zipCode']").fill('123456');
        await page.locator("[name='customer.phoneNumber']").fill('9876543210');
        await page.locator("[name='customer.ssn']").fill('123456789');
        await page.locator("[name='customer.username']").fill(username);
        await page.locator("[name='customer.password']").fill(password);
        await page.locator("[name='repeatedPassword']").fill(password);
        await page.getByRole('button', { name: 'Register' }).click();
    }

    async verifyRegistrationSuccess(page) {
        await expect(page).toHaveURL(URLs.register);
        await expect(page.locator("[id='rightPanel']")).toContainText('Your account was created successfully. You are now logged in.');
    }
}
