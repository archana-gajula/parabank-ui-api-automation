import {RegisterPage} from '../pages/register.page';
import {HomePage} from '../pages/home.page';
import {AccountPage} from '../pages/account.page';
import {LoginPage} from '../pages/login.page';
import {FundTransferPage} from '../pages/fundTransfer.page';
import {BillPayPage} from '../pages/billpay.page';
import {FindTransactionPage} from '../pages/findTransaction.page';

const { test } = require('@playwright/test');

const username = 'john_doe' + Math.floor(Math.random() * 1000);
const password = 'password';
const payeeName = 'Mike';
const billPayAmount = '34.58';
let firstAccountNo, secondAccountNo;

const homePage = new HomePage();
const registerPage = new RegisterPage();
const accountPage = new AccountPage();
const loginPage = new LoginPage();
const fundTransferPage = new FundTransferPage();
const billPayPage = new BillPayPage();
const findTransactionPage = new FindTransactionPage();


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
    await billPayPage.payBill(page, billPayAmount, secondAccountNo, payeeName);
    await findTransactionPage.findTransactionByAmount(page, request, secondAccountNo, billPayAmount, payeeName);

});