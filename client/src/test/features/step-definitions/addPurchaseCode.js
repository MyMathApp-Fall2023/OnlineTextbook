const { Given, When, Then, And, After, Before } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { time, assert } = require("console");
const webdriver = require("selenium-webdriver");
var { setDefaultTimeout } = require("@cucumber/cucumber");
const exp = require("constants");
//const options = new Chrome.Options();
setDefaultTimeout(60 * 1000);
let driver;
Before(function (env) {
	driver = new webdriver.Builder().forBrowser("chrome").build();
});

After(function () {
	driver.quit();
});

//Scenario: Successfully Accessing Purchase Code
//    Given user is logged in and at admin page
//    When clicking on purchase code page button
//    Then the user should be at purchase code page and see all purchase code

Given("user is logged in and at admin page", async () => {
	//log in: 
	await driver.get("http://localhost:3000/login");
 	await driver.sleep(3 * 1000);
	driver.findElement(webdriver.By.id("email")).sendKeys('ncc@me.com');
	driver.findElement(webdriver.By.id("password")).sendKeys('ncc');
	await driver.sleep(6 * 1000);
	await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/form/button`)).click();
 	await driver.sleep(6 * 1000);
	//navigate to admin:
	await driver.get("http://localhost:3000/admin");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});
When("clicking on purchase code page button", async () => {
    //driver.findElement(webdriver.By.id("email")).sendKeys("yushuang@me.com");
    //driver.findElement(webdriver.By.id("password")).sendKeys("yushuang");
	//await driver.sleep(6 * 1000);
	await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/div/div/div[1]/div/div/a[4]`)).click();
	///html/body/div/div/main/div/div/div/div[1]/div/div/a[4]
	await driver.sleep(6 * 1000);
});
Then("the user should be at purchase code page and see all purchase code", async () => {
	let curURL =  await driver.getCurrentUrl();
    expect(curURL).to.equal("http://localhost:3000/admin/purchase-code");
	//console.log(curURL);
    //expect(curURL).to.equal("http://localhost:3000/");
});

//---------------------------------------------------
//Scenario: Accessing purchase code not successful
//    Given user is logged in and at home page
//    Then the user should not see admin button

Given("user is logged in and at home page", async () => {
	await driver.get("http://localhost:3000/");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});

Then("the user should not see admin button", async () => {
	//await driver.expect(Selector('#admin').exists).notOk(); 
	await driver.expect(this.admin.exists).notOk()
	//await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/form/button`)) <= 0;
	//await driver.sleep(6 * 1000);
});