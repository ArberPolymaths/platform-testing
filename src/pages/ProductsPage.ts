// import { HTTPResponse } from 'puppeteer';
import BasePage from './BasePage';

class ProductsPage extends BasePage {

    public static quantityRequired = 'Quantity Required';
    public static customerTitle = 'CUSTOMER';

    private static browserRoot = 'ipd-ims-product-browser-component::shadow-dom(div)';
    private static editorRoot = 'ipd-ims-product-editor-component::shadow-dom(div)';
    private static firstProductInList = '.table.table-hover>tbody>tr';
    private static addAComponentBtnSelector = 'div.btn-toolbar.mt-4.mb-4>div:nth-child(2)';
    private static dropDownFeatureSelector = '#f_partNumber_0>option';
    private static quantityRequiredSelector = '.polymaths-react-forms>form>div:nth-child(2)>div>label';
    private static customerColumnSelector = '.sticky-top>tr>th:nth-child(3)>p';
    private static rowFooterSelector = '.row.footer>div>ul>li';

    async waitTillBrowserFooterIsLoaded(): Promise<void> {
        await (await this.pickShadowSelector(ProductsPage.browserRoot))?.waitForSelector(ProductsPage.rowFooterSelector);
    }
    async waitTillEditorFooterIsLoaded(): Promise<void> {
        await (await this.pickShadowSelector(ProductsPage.editorRoot))?.waitForSelector(ProductsPage.rowFooterSelector);
    }

    async getTextOfTitle(): Promise<string> {
        return await this.getTextValueRoot(ProductsPage.editorRoot, ProductsPage.quantityRequiredSelector);
    }
    async getCustomerColumnTitle(): Promise<string> {
        return await this.getTextValueRoot(ProductsPage.browserRoot, ProductsPage.customerColumnSelector);
    }
    private async getTextValueRoot(root: string, selector: string): Promise<string> {
        await (await this.pickShadowSelector(root))?.waitForSelector(selector);
        const numericLotSelector = await (await this.pickShadowSelector(root))?.$(selector);
        if (!numericLotSelector)
            throw Error('text not found');
        return await (await numericLotSelector.getProperty('innerText')).jsonValue() as string;
    }

    async clickFirstProductItem(): Promise<void> {
        await (await this.pickShadowSelector(ProductsPage.browserRoot))?.waitForSelector(ProductsPage.firstProductInList);
        await this.clickBtn(ProductsPage.browserRoot, ProductsPage.firstProductInList);
    }
    async clickAddAComponentBtn(): Promise<void> {
        await this.waitForSelector(ProductsPage.addAComponentBtnSelector);
        await this.clickBtn(null, ProductsPage.addAComponentBtnSelector);
    }

    private async checkVisibility(selector: string): Promise<boolean> {
        await (await this.pickShadowSelector(ProductsPage.editorRoot))?.waitForSelector(selector);
        const visibileField = await (await this.pickShadowSelector(ProductsPage.editorRoot))?.waitForSelector(selector);
        if (!visibileField) throw Error('visibileField not found');
        return Boolean(visibileField);
    }
    async checkVisibilityOfDropdown(): Promise<boolean> {
        return this.checkVisibility(ProductsPage.dropDownFeatureSelector);
    }
}

export default ProductsPage;