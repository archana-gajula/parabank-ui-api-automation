import {expect} from "@playwright/test";
import { URLs } from "../config";

export class HomePage {

    async goto(page) {
        await page.goto(URLs.baseUrl);
    }

    async navigateToRegister(page) {
        await page.getByRole('link', { name: 'Register' }).click();
        await expect(page).toHaveURL(URLs.register);
    }

    async logout(page) {
        await page.getByRole('link', { name: 'Log Out' }).click();
        await expect(page).toHaveURL(URLs.logout);
    }

    async verifyGlobalNavigation(page) {
        await page.locator("[class='home']").locator("[href='index.htm']").click();
        await expect(page).toHaveURL(URLs.home);
        await page.locator("[class='aboutus']").locator("[href='about.htm']").click();
        await expect(page).toHaveURL(URLs.about);
        await page.locator("[class='contact']").locator("[href='contact.htm']").click();
        await expect(page).toHaveURL(URLs.contact);
    }
}
