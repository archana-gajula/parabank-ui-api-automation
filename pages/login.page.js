import {expect} from "@playwright/test";


export class LoginPage {

    async login(page, username, password) {
        await page.locator("[name='username']").fill(username);
        await page.locator("[name='password']").fill(password);
        await page.getByRole('button', { name: 'Log In' }).click();

        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/overview.htm');
    }
}
