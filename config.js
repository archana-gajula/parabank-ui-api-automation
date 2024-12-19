const baseUrl = 'https://parabank.parasoft.com/parabank/';

export const URLs = {
    baseUrl: baseUrl,
    home: `${baseUrl}index.htm`,
    register: `${baseUrl}register.htm`,
    overview: `${baseUrl}overview.htm`,
    logout: `${baseUrl}index.htm?ConnType=JDBC`,
    about: `${baseUrl}about.htm`,
    contact: `${baseUrl}contact.htm`,
    billPay: `${baseUrl}billpay.htm`,
    openAccount: `${baseUrl}openaccount.htm`,
    transferFunds: `${baseUrl}transfer.htm`,
    transactionsByAmount: (accountNumber, amount) => `${baseUrl}services_proxy/bank/accounts/${accountNumber}/transactions/amount/${Number(amount).toString()}?timeout=30000`
};
