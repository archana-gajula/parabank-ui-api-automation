import {RegisterPage} from "../pages/register.page";
import { HomePage } from '../pages/home.page';
import {AccountPage} from "../pages/account.page";
import {LoginPage} from "../pages/login.page";
import {FundTransferPage} from "../pages/fundTransfer.page";
import {BillPayPage} from "../pages/billpay.page";

const { test, expect } = require('@playwright/test');

const username = 'john_doe' + Math.floor(Math.random() * 1000);
const password = 'password';
const billPayAmount = '20.00';
let firstAccountNo, secondAccountNo;

const homePage = new HomePage();
const registerPage = new RegisterPage();
const accountPage = new AccountPage();
const loginPage = new LoginPage();
const fundTransferPage = new FundTransferPage();
const billPay = new BillPayPage();


test('Parabank E2E Test', async ({ page, request }) => {

    await homePage.goto(page);
    await homePage.navigateToRegister(page);
    await registerPage.registerUser(page, username, password);
    await registerPage.verifyRegistrationSuccess(page);
    await homePage.logout(page);
    await loginPage.login(page, username, password);
    await accountPage.verifyAccountsOverview(page);
    firstAccountNo = await accountPage.getFirstAccountNumber(page);
    await homePage.verifyGlobalNavigation(page);
    await accountPage.openNewAccount(page, firstAccountNo);
    secondAccountNo = await accountPage.getNewAccountNumber(page);
    await fundTransferPage.transferFunds(page, '100', secondAccountNo, firstAccountNo);
    await billPay.payBill(page, billPayAmount, secondAccountNo);
    const cookies = await page.context().cookies();
    const response = await request.get(`https://parabank.parasoft.com/parabank/services_proxy/bank/accounts/${secondAccountNo}/transactions/amount/20?timeout=30000`, {
        headers: {
            'Cookie': cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; '),
        }
    });
    const responseBody = await response.json();
    console.log(responseBody);
    expect(response.status()).toBe(200);
    expect(responseBody[0].accountId).toBe(parseInt(secondAccountNo));
    expect(responseBody[0].type).toBe('Debit');
    expect(responseBody[0].amount).toBe(20);
    expect(responseBody[0].description).toBe('Bill Payment to Mike');

});