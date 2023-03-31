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

/*Scenario: Successfully Accessing purchased textbook
Given user is logged in and their status is valid
When I clicked the read book button
Then I should see the purchased book
*/

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

/*
Scenario: Accessing purchased textbook without logging in
Given user is not logged in
When I clicked the read book button
Then I should be directed to login page
*/
/*
Scenario: Accessing purchased textbook not successful
Given user is logged in but status is not valid
When I clicked the read book button
Then I should be directed to purchase book page
*/


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
