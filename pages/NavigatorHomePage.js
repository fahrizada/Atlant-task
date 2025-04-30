import { By, until, Key, WebDriver } from "selenium-webdriver";

class NavigatorHomePage {
    constructor(driver) {
        /** @type {WebDriver} */
        this.driver = driver;
        this.facebookIcon = By.css(".iconav-facebook");
        this.twitterIcon = By.css(".iconav-twitter-2");
        this.googlePlusIcon = By.css(".iconav-googleplus");

        this.englishButton = By.css(".btn-en");
        this.bosnianButton = By.css(".btn-bs");
        this.createPlaceTextEn = By.xpath('//*[text()="Create Place"]');
        this.createPlaceTextBs = By.xpath('//*[text()="Kreiraj objekat"]');

        this.searchBar = By.xpath('//input[@placeholder="Traži ulicu ili objekat"]');
        this.list = By.css(".menu_content_list.search-results");
        this.atlantbhDescription = By.xpath('//*[text()="informatička kompanija"]');
        
        this.formTriggerButton =  By.xpath('//*[text()="Predloži ideju - Pošalji komentar"]')
        this.nameInput = By.xpath('//input[@placeholder="Ime i prezime"]');
        this.emailInput = By.xpath('//input[@placeholder="Email"]');
        this.commentInput = By.xpath('//textarea[@placeholder="Komentar"]');
        this.submitButton = By.xpath('//input[@type="submit"]');
        this.errorMessage = By.xpath('//*[text()="Došlo je do neočekivane greške. Molimo pokušajte ponovo"]');

        this.nightlifeLink = By.css(".nightlife"); 
        this.storeResult = By.css(".menu_content_list");
        this.categoriesList = By.css(".menu_content_list.categories"); 

        this.zoomInButton = By.css(".leaflet-control-zoom-in");
        this.zoomOutButton = By.css(".leaflet-control-zoom-out");

    }

    async clickOnSocialIcon(iconLocator) {
        const icon = await this.driver.findElement(iconLocator);
        await this.driver.wait(until.elementIsVisible(icon), 10000);
        await icon.click(); 
    }

    async switchLanguage(buttonLocator) {
        const button = await this.driver.findElement(buttonLocator);
        await this.driver.wait(until.elementIsVisible(button), 10000);
        await button.click();
    }

    async isTextPresent(locator) {
        const element = await this.driver.findElement(locator);
        await this.driver.wait(until.elementIsVisible(element), 10000);
        return element.isDisplayed();
    }

    async fillAndSubmitForm(name, email, comment) {
    const trigger = await this.driver.findElement(this.formTriggerButton);
    await this.driver.wait(until.elementIsVisible(trigger), 10000);  
    await this.driver.wait(until.elementIsEnabled(trigger), 10000);

    await trigger.click();

    const nameField = await this.driver.findElement(this.nameInput);
    const emailField = await this.driver.findElement(this.emailInput);
    const commentField = await this.driver.findElement(this.commentInput);

    await nameField.sendKeys(name);
    await emailField.sendKeys(email);
    await commentField.sendKeys(comment);

    const submit = await this.driver.findElement(this.submitButton);
    await this.driver.wait(until.elementIsEnabled(submit), 10000);
    await submit.click();

    }

    async isErrorMessageVisible() {
        const error = await this.driver.wait(until.elementLocated(this.errorMessage),10000,"Error message did not appear");
        return error.isDisplayed();
    }

    async openNightLifeLinkAndSelectFirst() {
        const categoriesList = await this.driver.findElement(this.categoriesList);
        await this.driver.wait(until.elementIsVisible(categoriesList), 10000);

        const nightlifeLink = await this.driver.findElement(this.nightlifeLink);
        await this.driver.wait(until.elementIsVisible(nightlifeLink), 10000);
        await nightlifeLink.click();

        const storeResult = await this.driver.wait(until.elementLocated(this.storeResult), 10000);
        await this.driver.wait(until.elementIsVisible(storeResult), 10000);

        const liElements = await storeResult.findElements(By.css('li'));

        if (liElements.length === 0) {
            throw new Error("No elements in the list.");
        }

        const firstElement = liElements[0];
        await this.driver.wait(until.elementIsVisible(firstElement), 10000);
        await firstElement.click();
    }

    async searchAtlantbhMainSearch() {
        const searchInput = await this.driver.findElement(this.searchBar);
        await this.driver.wait(until.elementIsVisible(searchInput), 10000);
        await searchInput.clear();
        await searchInput.sendKeys("Atlantbh");
        await searchInput.sendKeys(Key.ENTER);
    

        const list = await this.driver.wait(until.elementLocated(this.list), 10000);
        await this.driver.wait(until.elementIsVisible(list), 10000);

        const liElements = await list.findElements(By.css('li'));

        if (liElements.length === 0) {
            throw new Error("No elements in the list.");
        }

        const firstElement = liElements[0];
        await this.driver.wait(until.elementIsVisible(firstElement), 10000);
        await firstElement.click();

        const desc = await this.driver.wait(until.elementLocated(this.atlantbhDescription),10000);
        await this.driver.wait(until.elementIsVisible(desc), 10000);
        return desc.getText();
    }

    async testZoomControls() {
        const zoomIn = await this.driver.findElement(this.zoomInButton);
        const zoomOut = await this.driver.findElement(this.zoomOutButton);
    
        await this.driver.wait(until.elementIsVisible(zoomIn), 5000);
        await this.driver.wait(until.elementIsVisible(zoomOut), 5000);
    
        for (let i = 0; i < 4; i++) {
            await zoomIn.click();
        }

        for (let i = 0; i < 4; i++) {
            await zoomOut.click();
        }
    }
    
}
export { NavigatorHomePage };    