import {expect} from "@playwright/test";

export class HomePage {

    async goto(page) {
        await page.goto('https://parabank.parasoft.com/parabank/');
    }

    async navigateToRegister(page) {
        await page.getByRole('link', { name: 'Register' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm');
    }

    async logout(page) {
        await page.getByRole('link', { name: 'Log Out' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
    }

    async login(page, username, password) {
        await page.locator("[name='username']").fill(username);
        await page.locator("[name='password']").fill(password);
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/overview.htm');
    }
}
