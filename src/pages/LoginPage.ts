import { Page } from 'puppeteer';
import BasePage from './BasePage';

class LoginPage extends BasePage {

    private static loginRoot = 'login-component::shadow-dom(div)';
    private static emailFieldSelector = '#f_email_0';
    private static passwordFieldSelector = '#f_password_0';
    private static loginBtnSelector = '#auth-btn';
    private static siteURL = 'https://amb.polymaths.dev';
    private static userEmail = 'arber@polymaths.co';
    private static userPassword = '.4r83r1.';
    private static navSelector = '.nav';
    private static spinnerSelector = '.spinner-border';

    async goToTheSite(): Promise<void> {
        await this.page.goto(LoginPage.siteURL);
        await this.page.setCacheEnabled(false);
        await this.waitForLoading();
    }

    async typeEmail(email: string): Promise<void> {
        await this.typeInField(LoginPage.loginRoot, LoginPage.emailFieldSelector, email);
    }

    async typePassword(password: string): Promise<void> {
        await this.typeInField(LoginPage.loginRoot, LoginPage.passwordFieldSelector, password);
    }
    async clickLoginButton(): Promise<void> {
        await this.clickBtn(LoginPage.loginRoot, LoginPage.loginBtnSelector);
    }

    async doAuthenticate(page: Page): Promise<void> {
        await page.goto(LoginPage.siteURL);
        await page.setCacheEnabled(false);
        await this.waitForLoading();

        while (!await (await this.pickShadowSelector(LoginPage.loginRoot))?.waitForSelector(LoginPage.emailFieldSelector)) {
            await page.reload({
                waitUntil: 'networkidle2',
                timeout: 10000,
            });
            await this.waitForLoading();
        }

        await this.typeEmail(LoginPage.userEmail);
        await this.typePassword(LoginPage.userPassword);
        await this.clickLoginButton();
        await this.waitForLongLoading();

        while (!await page.$(LoginPage.navSelector)) {
            await page.reload({
                waitUntil: 'networkidle2',
                timeout: 10000,
            });
            await this.waitForLongLoading();
        }
    }
    async reloadThePageTillStuckInLoading(): Promise<void> {
        // eslint-disable-next-line no-constant-condition
        while (true) {

            await this.page.reload({
                waitUntil: 'networkidle2',
                timeout: 10000,
            });
            await this.waitForLoading();
            if (await this.checkSpinner()) {
                break;
            }
        }

    }
    async checkSpinner(): Promise<boolean> {
        await this.page.waitForSelector(LoginPage.spinnerSelector);
        const spinner = await this.page.waitForSelector(LoginPage.spinnerSelector);
        return Boolean(spinner);
    }

}

export default LoginPage;