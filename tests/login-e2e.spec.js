import {RegisterPage} from "../pages/register.page";
import { HomePage } from '../pages/home.page';

const { test, expect } = require('@playwright/test');

const username = 'john_doe' + Math.floor(Math.random() * 1000);
const password = 'password';
const billPayAmount = '20.00';
let firstAccountNo, secondAccountNo;

const homePage = new HomePage();
const registerPage = new RegisterPage();


test('Parabank E2E Test', async ({ page, request }) => {

    await homePage.goto(page);
    await homePage.navigateToRegister(page);
    await registerPage.registerUser(page, username, password);
    await registerPage.verifyRegistrationSuccess(page);
    // logout
    await page.getByRole('link', { name: 'Log Out' }).click();
    // login
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
    await page.locator("[name='username']").fill(username);
    await page.locator("[name='password']").fill('password');
    await page.getByRole('button', { name: 'Log In' }).click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/overview.htm');
    await expect(page.locator("[id='rightPanel']")).toContainText('Accounts Overview');
    await page.waitForSelector("[id='accountTable']");
    firstAccountNo = await page.locator("[id='accountTable']").locator('tbody').locator('tr').nth(0).locator('td').nth(0).textContent();
    console.log(firstAccountNo);
    // verify global navigation
    await page.locator("[class='home']").locator("[href='index.htm']").click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator("[class='aboutus']").locator("[href='about.htm']").click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/about.htm');
    await page.locator("[class='contact']").locator("[href='contact.htm']").click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/contact.htm');
    // create new account
    await page.getByRole('link', { name: 'Open New Account' }).click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/openaccount.htm');
    await page.locator("[id='type']").selectOption('SAVINGS');
    await page.locator("[id='fromAccountId']").selectOption(firstAccountNo);
    await page.getByRole('button', { name: 'Open New Account' }).click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/openaccount.htm');
    await expect(page.locator("[id='rightPanel']")).toContainText('Congratulations, your account is now open.');
    await expect(page.locator("[id='openAccountResult']")).toContainText('Your new account number: ');
    await page.waitForSelector("[id='newAccountId']");
    secondAccountNo = await page.locator("[id='newAccountId']").textContent();
    console.log(secondAccountNo);
    // transfer funds
    await page.getByRole('link', { name: 'Transfer Funds' }).click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/transfer.htm');
    await page.locator("[id='amount']").fill('100');
    await page.locator("[id='fromAccountId']").selectOption(secondAccountNo);
    await page.locator("[id='toAccountId']").selectOption(firstAccountNo);
    await page.getByRole('button', { name: 'Transfer' }).click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/transfer.htm');
    await page.waitForSelector("[id='showResult']");
    await expect(page.locator("[id='rightPanel']")).toContainText('Transfer Complete!');
    // bill pay
    await page.getByRole('link', { name: 'Bill Pay' }).click();
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/billpay.htm');
    await page.locator("[name='payee.name']").fill('Mike');
    await page.locator("[name='payee.address.street']").fill('123 Street');
    await page.locator("[name='payee.address.city']").fill('AnyCity');
    await page.locator("[name='payee.address.state']").fill('AnyState');
    await page.locator("[name='payee.address.zipCode']").fill('123456');
    await page.locator("[name='payee.phoneNumber']").fill('9876543210');
    await page.locator("[name='payee.accountNumber']").fill('123456789');
    await page.locator("[name='verifyAccount']").fill('123456789');
    await page.locator("[name='amount']").fill(billPayAmount);
    await page.locator("[name='fromAccountId']").selectOption(secondAccountNo);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: "Send Payment" }).click();
    await page.waitForTimeout(2000);
    await page.waitForSelector("[id='billpayResult']");
    await expect(page.locator("[id='billpayResult']").locator('h1')).toContainText('Bill Payment Complete');
    await expect(page.locator("[id='billpayResult']").locator('p').nth(0)).toContainText(`Bill Payment to Mike in the amount of $${billPayAmount} from account ${secondAccountNo} was successful.`);

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