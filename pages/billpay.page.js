import {expect} from "@playwright/test";

export class BillPayPage {

    async payBill(page, billPayAmount, fromAccount, payeeName) {
        await page.getByRole('link', { name: 'Bill Pay' }).click();
        await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/billpay.htm');
        await page.locator("[name='payee.name']").fill(payeeName);
        await page.locator("[name='payee.address.street']").fill('123 Street');
        await page.locator("[name='payee.address.city']").fill('AnyCity');
        await page.locator("[name='payee.address.state']").fill('AnyState');
        await page.locator("[name='payee.address.zipCode']").fill('123456');
        await page.locator("[name='payee.phoneNumber']").fill('9876543210');
        await page.locator("[name='payee.accountNumber']").fill('123456789');
        await page.locator("[name='verifyAccount']").fill('123456789');
        await page.locator("[name='amount']").fill(billPayAmount);
        await page.locator("[name='fromAccountId']").selectOption(fromAccount);
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: "Send Payment" }).click();
        await page.waitForTimeout(2000);
        await page.waitForSelector("[id='billpayResult']");
        await expect(page.locator("[id='billpayResult']").locator('h1')).toContainText('Bill Payment Complete');
        await expect(page.locator("[id='billpayResult']").locator('p').nth(0)).toContainText(`Bill Payment to ${payeeName} in the amount of $${billPayAmount} from account ${fromAccount} was successful.`);
    }
}
