const {expect} = require('@playwright/test');
import { URLs } from "../config";

export class FindTransactionPage {
    async findTransactionByAmount(page, request, accountNumber, amount, payeeName) {
        const cookies = await page.context().cookies();
        const response = await request.get(`${URLs.transactionsByAmount(accountNumber, amount)}`, {
            headers: {
                'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        await this.verifyTransactionDetails(responseBody, accountNumber, amount, payeeName);
    }

    async verifyTransactionDetails(response, accountNumber, amount, payeeName) {
        expect(response[0].accountId).toBe(parseInt(accountNumber));
        expect(response[0].type).toBe('Debit');
        expect(response[0].amount).toBe(Number(amount));
        expect(response[0].description).toBe(`Bill Payment to ${payeeName}`);
    }
}