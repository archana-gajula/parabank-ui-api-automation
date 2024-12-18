import {expect} from "@playwright/test";

export class FundTransferPage  {
    async transferFunds(page, amount, fromAccountNo, toAccountNo) {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/transfer.htm');
        await page.locator("[id='amount']").fill('100');
        await page.locator("[id='fromAccountId']").selectOption(fromAccountNo);
        await page.locator("[id='toAccountId']").selectOption(toAccountNo);
        await page.getByRole('button', { name: 'Transfer' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/transfer.htm');
        await page.waitForSelector("[id='showResult']");
        await expect(page.locator("[id='rightPanel']")).toContainText('Transfer Complete!');
    }
}