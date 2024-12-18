import {expect} from "@playwright/test";

export class AccountPage {

    async verifyAccountsOverview(page) {
        await expect(page.locator("[id='rightPanel']")).toContainText('Accounts Overview');
        await page.waitForSelector("[id='accountTable']");
    }

    async getFirstAccountNumber(page) {
        return await page.locator("[id='accountTable']").locator('tbody').locator('tr').nth(0).locator('td').nth(0).textContent();
    }

    async openNewAccount(page, fromAccountNo) {
        await page.getByRole('link', { name: 'Open New Account' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/openaccount.htm');
        await page.locator("[id='type']").selectOption('SAVINGS');
        await page.locator("[id='fromAccountId']").selectOption(fromAccountNo);
        await page.getByRole('button', { name: 'Open New Account' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/openaccount.htm');
        await expect(page.locator("[id='rightPanel']")).toContainText('Congratulations, your account is now open.');
        await expect(page.locator("[id='openAccountResult']")).toContainText('Your new account number: ');
    }

    async getNewAccountNumber(page) {
        await page.waitForSelector("[id='newAccountId']");
        return await page.locator("[id='newAccountId']").textContent();
    }

    async transferFunds(page, amount, fromAccountNo, toAccountNo) {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/transfer.htm');
        await page.locator("[id='amount']").fill(amount);
        await page.locator("[id='fromAccountId']").selectOption(fromAccountNo);
        await page.locator("[id='toAccountId']").selectOption(toAccountNo);
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/transfer.htm');
        await page.waitForSelector("[id='showResult']");
        await expect(page.locator("[id='rightPanel']")).toContainText('Transfer Complete!');
    }
}
