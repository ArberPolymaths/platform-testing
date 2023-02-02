import BasePage from './BasePage';

class SidebarMenu extends BasePage {
    private static firstChild = '.collapse.show ul li:nth-child(1)';
    private static secondChild = '.collapse.show ul li:nth-child(2)';
    private static thirdChild = '.collapse.show ul li:nth-child(3)';

    private static delivery = '.fa.fa-truck';
    private static inventorySelector = '.fas.fa-warehouse';
    private static catalogSelector = '.fa.fa-map';

    private static shipmentsMenuSelector = this.firstChild;
    private static customersListSelector = this.thirdChild;
    private static componentLotsMenuSelector = this.firstChild;
    private static workOrderSelector = this.secondChild;
    private static vendorsSelector = this.secondChild;
    private static productsSelector = this.firstChild;

    async navigateToComponentLots(): Promise<void> {
        await this.page.waitForSelector(SidebarMenu.inventorySelector);
        await this.page.click(SidebarMenu.inventorySelector);

        await this.clickOnCLots();
    }
    async clickOnCLots(): Promise<void> {
        await this.page.waitForSelector(SidebarMenu.componentLotsMenuSelector);
        await this.page.click(SidebarMenu.componentLotsMenuSelector);
    }

    async navigateToVendors(): Promise<void> {
        await this.page.waitForSelector(SidebarMenu.vendorsSelector);
        await this.page.click(SidebarMenu.vendorsSelector);
    }

    async navigateToCustomers(): Promise<void> {
        await this.page.waitForSelector(SidebarMenu.customersListSelector);
        await this.page.click(SidebarMenu.customersListSelector);
    }

    async navigateToShipments(): Promise<void> {
        await this.page.waitForSelector(SidebarMenu.delivery);
        await this.page.click(SidebarMenu.delivery);

        await this.page.waitForSelector(SidebarMenu.shipmentsMenuSelector);
        await this.page.click(SidebarMenu.shipmentsMenuSelector);
    }
    async navigateToWorkOrders(): Promise<void> {
        await this.page.waitForSelector(SidebarMenu.inventorySelector);
        await this.page.click(SidebarMenu.inventorySelector);

        await this.clickOnWorkOrders();
    }
    async clickOnWorkOrders(): Promise<void> {
        await this.page.waitForSelector(SidebarMenu.workOrderSelector);
        await this.page.click(SidebarMenu.workOrderSelector);
    }
    async navigateToProducts(): Promise<void> {
        await this.page.waitForSelector(SidebarMenu.catalogSelector);
        await this.page.click(SidebarMenu.catalogSelector);

        await this.page.waitForSelector(SidebarMenu.productsSelector);
        await this.page.click(SidebarMenu.productsSelector);
    }
}
export default SidebarMenu;