const {expect} = require('@playwright/test');

export class FindTransactionPage {
    async findTransactionByAmount(page, request, accountNo, amount, payeeName) {
        const cookies = await page.context().cookies();
        const response = await request.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${accountNo}/transactions/amount/${Number(amount).toString()}?timeout=30000`, {
            headers: {
                'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        this.verifyTransactionDetails(responseBody, accountNo, amount, payeeName);
    
    }

    async verifyTransactionDetails(response, accountNo, amount, payeeName) {
        expect(response[0].accountId).toBe(parseInt(accountNo));
        expect(response[0].type).toBe('Debit');
        expect(response[0].amount).toBe(Number(amount));
        expect(response[0].description).toBe(`Bill Payment to ${payeeName}`);
    }
}