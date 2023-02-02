import { HTTPResponse } from 'puppeteer';
import BasePage from './BasePage';
import * as constants from './constants';

class InventoryComponentLots extends BasePage {

    private static cLotBrowserRoot = 'ipd-ims-component-lot-browser-component::shadow-dom(div)';
    private static cLotEditorRoot = 'ipd-ims-component-lot-editor-component::shadow-dom(div)';
    private static historyWidget = 'ipd-ims-component-lot-history-tab-component::shadow-dom(map-audit-history-widget::shadow-dom(div))';
    private static cLotItemHistorySelector = '.nav.nav-tabs li:nth-child(3)';
    private static firstComponentLotSelector = '.h-100.d-flex';
    private static newComponentURL = 'https://amb.polymaths.dev/inventory/component-lots/new/component-lot';
    private static unauthorizedPageURL = 'https://amb.polymaths.dev/inventory/component-lots/new/component-lot/unauthorized-page';
    private static disabledNameFieldSelector = '[id=f_customerId_0]:disabled';
    private static disabledReceivingNumberSelector = '[id=f_receivingNumber_0]:disabled';
    private static disabledManufacturerNumberSelector = '[id=f_manufacturerNumber_1]:disabled';
    private static disabledRevisionNumberSelector = '[id=f_revisionNumber_2]:disabled';
    private static disabledLotSizeSelector = '[id=f_lotSize_3]:disabled';
    private static disabledExpirationDateSelector = '[id=f_expirationDate_4]:disabled';
    private static addNewInventoryBtnSelector = '.btn.btn-sm.btn-light';
    private static customerFormSelectorInNewInventory = '#f_customerId_0';
    private static nextBtnSelectorInNewInventory = '.nav-buttons>div>div>button.btn.btn-primary';
    // manually added values for dropdown selection
    private static valueOfSelectedCustomerInNewInventory = '2';
    private static valueOfPartNumInNewInventory = 'PN-003-C';
    private static valueOfWarehouseLocationInInspection = '1';
    private static valueOfSelectedLocationInQA = '4';
    private static valueOfSelectedLocationInNewInventory = '6';

    private static partNumSelectorinNewInventory = '#f_partNumber_0';
    private static hasMFRBtnSelector = '#f_hasManufacturerNumber_0';
    private static mfrNumFieldSelector = '#f_manufacturerNumber_0';
    private static receNumSelectorInNewInventory = '#f_receivingNumber_0';
    private static lotNumSelectorInNewInventory = '#f_lotSize_0';
    private static closeNotificationBtn = '.div.toast-header.text-white.bg-success>button';
    private static responsiveRowsSelector = '.table.table-hover>tbody>tr[role=button]';
    private static sendToQaSelector = '.fa.fa-filter.me-2';
    private static locationSelector = '#f_locationId_0';
    private static saveButtonInQA = '.form-actions>div>button';
    private static failInspectionSelector = '.fa.fa-thumbs-down.me-2';
    private static passInspectionSelector = '.fa.fa-thumbs-up.me-2';
    private static cLotStatusSelector = '.d-flex.justify-content-between>span';
    private static acceptedQuantitySelector = '#f_allocatedCount_0';
    private static lotSizeSelector = '#f_lotSize_3';
    private static errorMessageSelector = '.text-danger';
    private static balanceSelector = '.table.table-hover>tbody>tr>td:nth-child(3)>div>p';
    private static locationSubMenuSelector = 'div.navigation.d-flex.mt-2>ul>li:nth-child(4)>p';
    private static purchaseOrderTitleSelector = '.polymaths-react-forms>form>div:nth-child(3)>div:nth-child(2)>label';
    private static purchaseOrderFieldSelector = '#f_purchaseOrderNumber_1';
    private static mfrTitleSelector = '.sticky-top>tr>th:nth-child(7)>p';
    private static mfrInEditorTitleSelector = '.polymaths-react-forms>form>div:nth-child(2)>div:nth-child(2)>label';
    private static maxNumerOfRowsSelector = '.col-6.text-end.m-auto';
    private static lastPageSelector = '.pagination.m-0>li:nth-last-child(2)';
    private static lastPageTyperSelector = '.form-control-plaintext';
    private static receNumSelectorInBrowser = '.table.table-hover>tbody>tr>td:nth-child(5)>div>p';
    private static statusColumnHeaderSelector = '.sticky-top>tr>th:nth-child(6)>p';
    private static expirationDateColumnTitle = '.sticky-top>tr>th:nth-child(8).false>p';
    private static expirationDateDropdownValues = '.filterBar>div:nth-child(4)>div>div';
    private static rowFooterSelector = '.row.footer';
    private static partNumberSelector = '.border.mt-2.p-2>div>div>div>div:nth-child(2)>p:nth-child(2)';
    private static receNumSelectorInEditor = '#f_receivingNumber_0';
    private static mfrSelectorInEditor = '#f_manufacturerNumber_1';
    private static dateExpirationSelectorInEditor = '#f_expirationDate_4';
    private static saveBtnHeaderSelector = '.btn-group.me-2>button:nth-child(2)';
    private static disabledUndoBtnHeaderSelector = '.btn-group.me-2>button.btn.btn-sm.btn-light.toolbar-action-disabled:nth-child(4)';
    private static historyTabSelector = '.nav.nav-tabs>li:nth-child(3)';
    private static changesInHistoryTabSelector = '.table.table-hover>tbody>tr>td:nth-child(4)>span';

    async getChangesInHistoryTab(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.historyWidget, InventoryComponentLots.changesInHistoryTabSelector);
    }
    async clickHistoryTabBtn(): Promise<void> {
        await this.clickBtn(null, InventoryComponentLots.historyTabSelector);
    }
    async checkDisabledUndoBtn(): Promise<boolean> {
        await this.pickShadowSelector(InventoryComponentLots.disabledUndoBtnHeaderSelector);
        const disabledField = await this.pickShadowSelector(InventoryComponentLots.disabledUndoBtnHeaderSelector);
        return Boolean(disabledField);
    }
    async clickSaveBtnInHeader(): Promise<void> {
        await this.clickBtn(null, InventoryComponentLots.saveBtnHeaderSelector);
    }
    async changeMFRNumber(): Promise<void> {
        await this.clearField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.mfrSelectorInEditor);
        await this.typeInField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.mfrSelectorInEditor, constants.ONE.toString());
    }
    async changeReceNumber(): Promise<void> {
        await this.clearField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.receNumSelectorInEditor);
        await this.typeInField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.receNumSelectorInEditor, await this.generateTenDigitsNumber());
    }
    async typeDate(): Promise<void> {
        await this.typeInField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.dateExpirationSelectorInEditor, '12122025');
    }
    async checkForDropdownElements(): Promise<boolean> {
        await this.waitForLoading();
        await this.clickBtn(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.expirationDateDropdownValues);
        await this.waitForLoading();
        const selector = await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.$(InventoryComponentLots.expirationDateDropdownValues);
        if (!selector) throw new Error('No selector');
        const valuesList = await selector.$$('div>ul');
        if (!valuesList) throw new Error('list is missing');
        return Boolean(valuesList.length >= constants.ONE);
    }
    async createANewInventoryCLot(): Promise<void> {
        await this.waitTillBrowserFooterIsLoaded();
        await this.clickAddNewInventoryBtn();
        await this.waitForShortLoading();
        await this.selectCustomerFromList();
        await this.waitForShortLoading();
        await this.clickNextBtnInNewInventory();
        await this.waitForShortLoading();
        await this.selectPartNumFromList();
        await this.waitForShortLoading();
        await this.clickNextBtnInNewInventory();
        await this.waitForShortLoading();
        await this.clickHasMFRButton();
        await this.waitForShortLoading();
        await this.typeMFRNum();
        await this.waitForShortLoading();
        await this.typeLotNum();
        await this.waitForShortLoading();
        await this.clickNextBtnInNewInventory();
        await this.waitForShortLoading();
        await this.selectLocationFromList();
        await this.waitForLoading();
        await this.clickNextBtnInNewInventory();
        await this.waitForLoading();
        await this.clickNextBtnInNewInventory();
        await this.waitForLongLoading();
    }
    async getMFRTitle(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.mfrTitleSelector);
    }
    async getStatusHeaderTitle(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.statusColumnHeaderSelector);
    }
    async getExpirationDateHeaderTitle(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.expirationDateColumnTitle);
    }
    async getReceNumberInEditor(): Promise<string> {
        const number = await this.getNumberValueRoot(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.receNumSelectorInNewInventory);
        return number.toString();
    }
    private async getNumberValueRoot(root: string, selector: string): Promise<number> {
        await (await this.pickShadowSelector(root))?.waitForSelector(selector);
        const number = await (await this.pickShadowSelector(root))?.$(selector);
        if (!number)
            throw Error('the text is not found');
        return await (await number.getProperty('value')).jsonValue() as number;
    }
    async getReceNumberInBrowser(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.receNumSelectorInBrowser);
    }
    async getTotalNumberOfRows(): Promise<string> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.maxNumerOfRowsSelector);
        const totalCustomersNumberSelector = await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.$(InventoryComponentLots.maxNumerOfRowsSelector);
        const insideText = totalCustomersNumberSelector ? await (await totalCustomersNumberSelector.getProperty('innerText')).jsonValue() as string : '';
        const stringArray = insideText.split(' '); // split into subsrtrings on space => " "
        return stringArray[constants.THIRD_SUBSTRING_INDEX]; // returns 3rd substring => total number of rows
    }
    async clickOnLastPage(): Promise<void> {
        const totalRows = parseInt(await this.getTotalNumberOfRows(), 10);
        // if there are less than 251 rows , it means there are max 5 pages so the pagination is different than more than 5 pages
        if (totalRows < constants.TWO_HUNDRED_FIFTY_ONE) {
            await this.clickBtn(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.lastPageSelector);
        } else {
            await this.clearField(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.lastPageTyperSelector);
            // there are 50 rows per page so divide with 50 to know how may FULL pages there are
            // turn to string then turn to number to ignore decimal part
            const numOfFullPages = parseInt((totalRows / constants.FIFTY).toString(), 10);

            if (totalRows % constants.FIFTY !== constants.ZERO) {
                // example 301/50 = 6 ... there are 6 full pages and the 7th page exists with 1 row
                // increase by 1 to click on the next non full page ( last page )
                const increasedValueByOne = numOfFullPages + constants.ONE;
                await this.typeInField(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.lastPageTyperSelector, increasedValueByOne.toString());
            } else {
                // example 300/50 = 6 .. there are 6 full pages so 7th page doesnt exist .. 6 is last page
                await this.typeInField(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.lastPageTyperSelector, numOfFullPages.toString());
            }
        }
    }
    private async getTextValueRoot(root: string, selector: string): Promise<string> {
        await (await this.pickShadowSelector(root))?.waitForSelector(selector);
        const text = await (await this.pickShadowSelector(root))?.$(selector);
        if (!text)
            throw Error('text not found');
        return await (await text.getProperty('innerText')).jsonValue() as string;
    }
    private async getTextNoRoot(selector: string): Promise<string> {
        await this.waitForSelector(selector);
        if (!selector) throw Error('Selector not found');
        const text = await this.pickShadowSelector(selector);
        if (!text)
            throw Error('text not found');
        return await (await text.getProperty('innerText')).jsonValue() as string;
    }
    async getMFREditorTitle(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.mfrInEditorTitleSelector);
    }
    async typePurchaseNumber(): Promise<void> {
        await this.typeInField(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.purchaseOrderFieldSelector, constants.TWENTY);
    }
    async getPurchaseOrderTitle(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.purchaseOrderTitleSelector);
    }
    async getLocationTitle(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.locationSubMenuSelector);
    }
    async getErrorMessageValue(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.errorMessageSelector);
    }
    async getBalanceValue(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.balanceSelector);
    }
    async getLotSizeValue(): Promise<number> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.waitForSelector(InventoryComponentLots.lotSizeSelector);
        const numericLotSelector = await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.$(InventoryComponentLots.lotSizeSelector);
        if (!numericLotSelector)
            throw Error('numericLotSelector not found');
        return await (await numericLotSelector.getProperty('value')).jsonValue() as number;
    }
    async typeGreaterThanLotSize(): Promise<void> {
        const number = await this.getLotSizeValue();
        const sumNumber = parseInt(number.toString(), 10) + constants.ONE;
        const numToString = sumNumber.toString();
        await this.typeInField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.acceptedQuantitySelector, numToString);
    }
    async typeSmallerThanLotSize(): Promise<void> {
        const number = await this.getLotSizeValue();
        const sumNumber = parseInt(number.toString(), 10) - constants.ONE;
        const numToString = sumNumber.toString();
        await this.typeInField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.acceptedQuantitySelector, numToString);
    }
    async getValueOfGivenAcceptedQuantity(): Promise<string> {
        return (await this.getLotSizeValue() - constants.ONE).toString();
    }
    async markFailInspection(): Promise<void> {
        await this.waitForSelector(InventoryComponentLots.failInspectionSelector);
        await this.clickBtn(null, InventoryComponentLots.failInspectionSelector);
    }
    async markPassInspection(): Promise<void> {
        await this.waitForSelector(InventoryComponentLots.passInspectionSelector);
        await this.clickBtn(null, InventoryComponentLots.passInspectionSelector);
    }
    async clickLastResponsiveRow(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.responsiveRowsSelector);
        const list = await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.$$(InventoryComponentLots.responsiveRowsSelector);
        if (!list) throw new Error('list is missing');
        const lastElement = list[list.length - constants.ONE];
        await lastElement.click();
    }
    async clickSendToQa(): Promise<void> {
        await this.waitForSelector(InventoryComponentLots.sendToQaSelector);
        await this.clickBtn(null, InventoryComponentLots.sendToQaSelector);
    }
    async clickSaveToSendToQA(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.waitForSelector(InventoryComponentLots.saveButtonInQA);
        await this.clickBtn(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.saveButtonInQA);
    }
    async getValueOfCLotStatus(): Promise<string> {
        return await this.getTextValueRoot(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.cLotStatusSelector);
    }
    async clickAddNewInventoryBtn(): Promise<void> {
        await this.clickBtn(null, InventoryComponentLots.addNewInventoryBtnSelector);
    }
    async typeLotNum(): Promise<void> {
        await this.typeInField(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.lotNumSelectorInNewInventory, constants.TWENTY);
    }
    async typeMFRNum(): Promise<void> {
        await this.typeInField(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.mfrNumFieldSelector, constants.TWENTY);
    }
    async typeThirteenAcceptedQuantity(): Promise<void> {
        await this.typeInField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.acceptedQuantitySelector, constants.THIRTEEN);
    }
    async typeThirteenPointOneInAcceptedQuantity(): Promise<void> {
        await this.typeInField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.acceptedQuantitySelector, constants.THIRTEEN_POINT_ONE);
    }
    async typeMinusThirteenInAcceptedQuantity(): Promise<void> {
        await this.typeInField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.acceptedQuantitySelector, constants.MINUS_THIRTEEN);
    }
    async clickFirstComponentLotItem(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.firstComponentLotSelector);
        await this.clickBtn(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.firstComponentLotSelector);
    }
    async clickNextBtnInNewInventory(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.nextBtnSelectorInNewInventory);
        await this.clickBtn(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.nextBtnSelectorInNewInventory);
    }
    async clickHasMFRButton(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.hasMFRBtnSelector);
        await this.clickBtn(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.hasMFRBtnSelector);
    }
    async closeNotification(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.closeNotificationBtn);
        await this.clickBtn(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.closeNotificationBtn);
    }
    async selectPartNumFromList(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.partNumSelectorinNewInventory);
        await this.selectOptionByValue(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.partNumSelectorinNewInventory, InventoryComponentLots.valueOfPartNumInNewInventory);
    }
    async selectCustomerFromList(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.customerFormSelectorInNewInventory);
        await this.selectOptionByValue(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.customerFormSelectorInNewInventory, InventoryComponentLots.valueOfSelectedCustomerInNewInventory);
    }
    async selectLocationFromQAList(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.waitForSelector(InventoryComponentLots.locationSelector);
        await this.selectOptionByValue(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.locationSelector, InventoryComponentLots.valueOfSelectedLocationInQA);
    }
    async selectWHLocationFromTheList(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.waitForSelector(InventoryComponentLots.locationSelector);
        await this.selectOptionByValue(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.locationSelector, InventoryComponentLots.valueOfWarehouseLocationInInspection);
    }
    async selectLocationFromList(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.locationSelector);
        await this.selectOptionByValue(InventoryComponentLots.cLotBrowserRoot, InventoryComponentLots.locationSelector, InventoryComponentLots.valueOfSelectedLocationInNewInventory);
    }
    private async selectOptionByValue(shadow: string, selector: string, value: string): Promise<void> {
        const element = await (await this.pickShadowSelector(shadow))?.waitForSelector(selector);
        await element?.select(`select${element}`, `${value}`);
    }
    async waitTillCLotsAreShown(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.firstComponentLotSelector);
    }
    async waitTillEditorFooterIsLoaded(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.waitForSelector(InventoryComponentLots.rowFooterSelector);
    }
    async waitTillBrowserFooterIsLoaded(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotBrowserRoot))?.waitForSelector(InventoryComponentLots.rowFooterSelector);
    }
    async waitTillPartNumIsLoaded(): Promise<void> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.waitForSelector(InventoryComponentLots.partNumberSelector);
    }
    async clickComponentLotItemHistory(): Promise<void> {
        await this.clickBtn(null, InventoryComponentLots.cLotItemHistorySelector);
    }
    async checkDisabledNameField(): Promise<boolean> {
        return this.checkDisabledFields(InventoryComponentLots.disabledNameFieldSelector);
    }
    async checkDisabledReceivingNumberField(): Promise<boolean> {
        return this.checkDisabledFields(InventoryComponentLots.disabledReceivingNumberSelector);
    }
    async checkDisabledManufacturerNumberField(): Promise<boolean> {
        return this.checkDisabledFields(InventoryComponentLots.disabledManufacturerNumberSelector);
    }
    async checkDisabledRevisionNumberField(): Promise<boolean> {
        return this.checkDisabledFields(InventoryComponentLots.disabledRevisionNumberSelector);
    }
    async checkDisabledLotSizeField(): Promise<boolean> {
        return this.checkDisabledFields(InventoryComponentLots.disabledLotSizeSelector);
    }
    async checkDisabledExpirationDateField(): Promise<boolean> {
        return this.checkDisabledFields(InventoryComponentLots.disabledExpirationDateSelector);
    }
    private async checkDisabledFields(selector: string): Promise<boolean> {
        await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.waitForSelector(selector);
        const disabledField = await (await this.pickShadowSelector(InventoryComponentLots.cLotEditorRoot))?.waitForSelector(selector);
        if (!disabledField) throw Error('disabledField not found');
        return Boolean(disabledField);
    }
    async goToNewComponentUrl(): Promise<HTTPResponse | null> {
        return this.goTo(InventoryComponentLots.newComponentURL);
    }
    getUnauthorizedPageURL(): string {
        return InventoryComponentLots.unauthorizedPageURL;
    }
    async generateTenDigitsNumber(): Promise<string> {
        return (Math.floor(Math.random() * constants.nineBillion) + constants.oneBillion).toString();
    }
    async clearAcceptedQuantityField(): Promise<void> {
        await this.clearField(InventoryComponentLots.cLotEditorRoot, InventoryComponentLots.acceptedQuantitySelector);
    }
}

export default InventoryComponentLots;