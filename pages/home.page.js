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

    async verifyGlobalNavigation(page) {
        await page.locator("[class='home']").locator("[href='index.htm']").click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/index.htm');
        await page.locator("[class='aboutus']").locator("[href='about.htm']").click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/about.htm');
        await page.locator("[class='contact']").locator("[href='contact.htm']").click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/contact.htm');
    }
}
