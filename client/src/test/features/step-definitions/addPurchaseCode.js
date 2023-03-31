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
//    Given user is admin
//    When clicking on purchase code page
//    Then the user should be at purchase code page and see all purchase code



Given("user navigates to the website lo login", async () => {
	await driver.get("http://localhost:3000/login");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});

When("I type 'yushuang@me.com' and 'yushuang' as email and password", async () => {

    driver.findElement(webdriver.By.id("email")).sendKeys("yushuang@me.com");
    driver.findElement(webdriver.By.id("password")).sendKeys("yushuang");
	await driver.sleep(6 * 1000);
});
When("I click on 'login'", async () => {	
    await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/form/button`)).click();
	await driver.sleep(6 * 1000);
});

Then("login must be successful.", async () => {
	let curURL =  await driver.getCurrentUrl();
    expect(curURL).to.equal("http://localhost:3000/");

	//console.log(curURL);
    //expect(curURL).to.equal("http://localhost:3000/");
});






Given("user navigates to the website lo login", async () => {
	await driver.get("http://localhost:3000/login");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});

When("I type 'yushuang@me.com' and 'yushuang' as email and password", async () => {

    driver.findElement(webdriver.By.id("email")).sendKeys("yushuang@me.com");
    driver.findElement(webdriver.By.id("password")).sendKeys("yushuang");
	await driver.sleep(6 * 1000);
});
When("I click on 'login'", async () => {	
    await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/form/button`)).click();
	await driver.sleep(6 * 1000);
});

Then("login must be successful.", async () => {
	let curURL =  await driver.getCurrentUrl();
    expect(curURL).to.equal("http://localhost:3000/");

	//console.log(curURL);
    //expect(curURL).to.equal("http://localhost:3000/");
});
