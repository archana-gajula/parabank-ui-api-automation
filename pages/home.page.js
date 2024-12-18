import {expect} from "@playwright/test";

export class HomePage {

    async goto(page) {
        await page.goto('https://parabank.parasoft.com/parabank/');
    }

    async navigateToRegister(page) {
        await page.getByRole('link', { name: 'Register' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm');
    }

}
