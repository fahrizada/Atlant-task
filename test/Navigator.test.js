import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { expect } from "chai";
import { NavigatorHomePage } from "../pages/NavigatorHomePage.js";

describe("Navigator Homepage Tests", function () {
    /** @type {WebDriver} */
    let driver;
    let homePage;

    beforeEach(async function () {
        driver = await new Builder().forBrowser(Browser.CHROME).build();
        homePage = new NavigatorHomePage(driver);
        await driver.get("https://www.navigator.ba");
        await driver.manage().window().maximize();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it("Test 1 - Page title should contain 'Navigator'", async function () {
        const title = await driver.getTitle();
        expect(title).to.include("Navigator");
    });

    it("Test 2 - Social media icons should be clickable", async function () {
        await homePage.clickOnSocialIcon(homePage.facebookIcon);
        await homePage.clickOnSocialIcon(homePage.twitterIcon);
        await homePage.clickOnSocialIcon(homePage.googlePlusIcon);
    });

    it("Test 3 - Language switcher should display correct content", async function () {
        await homePage.switchLanguage(homePage.englishButton);
        expect(await homePage.isTextPresent(homePage.createPlaceTextEn)).to.be.true;
    
        await homePage.switchLanguage(homePage.bosnianButton);
        expect(await homePage.isTextPresent(homePage.createPlaceTextBs)).to.be.true;
    });

    it('Test 4 - Search "Atlantbh" in main search', async function () {
        expect(await homePage.searchAtlantbhMainSearch()).to.include("informatička kompanija");
        console.log(await homePage.searchAtlantbhMainSearch());
    });

    it("Test 5 - Fill contact form and validate error message on submit", async function () {
        await homePage.fillAndSubmitForm("test", "test@test.com", "test comment");
    
        expect(await homePage.isErrorMessageVisible()).to.be.true;
    })

    it("Test 6 - Open nightlife link and select first", async function () {
        await homePage.openNightLifeLinkAndSelectFirst();
    })

    it("Test 7 - Verify map zoom in and zoom out functionality", async function () {
        await homePage.testZoomControls();
    });
    
});    