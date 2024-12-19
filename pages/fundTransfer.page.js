import {expect} from "@playwright/test";
import {URLs} from "../config";

export class FundTransferPage  {
    async transferFunds(page, amount, fromAccountNo, toAccountNo) {
        await page.getByRole('link', { name: 'Transfer Funds' }).click();
        await expect(page).toHaveURL(URLs.transferFunds);
        await page.locator("[id='amount']").fill('100');
        await page.locator("[id='fromAccountId']").selectOption(fromAccountNo);
        await page.locator("[id='toAccountId']").selectOption(toAccountNo);
        await page.getByRole('button', { name: 'Transfer' }).click();
        await page.waitForSelector("[id='showResult']");
        await expect(page.locator("[id='rightPanel']")).toContainText('Transfer Complete!');
    }
}