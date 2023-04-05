const { Given, When, Then, And, After, Before } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { time, assert } = require("console");
const webdriver = require("selenium-webdriver");
var { setDefaultTimeout } = require("@cucumber/cucumber");
const exp = require("constants");

//const options = new Chrome.Options();

// Set default timeout to 60 seconds
setDefaultTimeout(60 * 1000);

// Declare driver variable
let driver;

// Set up Before and After hooks
Before(function (env) {
 driver = new webdriver.Builder().forBrowser("chrome").build();
});

After(function () {
 driver.quit();
});

//场景
Given("user is in home page", async () => {
	await driver.get("http://localhost:3000/");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});



When("login as admin",  async () => {
//When("the user enters their email and password", async () => {

    await driver.get("http://localhost:3000/login");
    await driver.sleep(3 * 1000);

    driver.findElement(webdriver.By.id("email")).sendKeys("ncc@me.com");
    driver.findElement(webdriver.By.id("password")).sendKeys("ncc");
	await driver.sleep(6 * 1000);

	await driver.get("http://localhost:3000/");
	await driver.sleep(3 * 1000);

});

When("not login as admin",  async () => {
    //When("the user enters their email and password", async () => {
    });


When("go to the admin url",  async () => {
    await driver.get("http://localhost:3000/admin/user");
    await driver.sleep(3 * 1000);
        //When("the user enters their email and password", async () => {
        });
    
// Scenario 1: Successful Login with Valid Entries
Then("the user should be at admin page and see info.", async () => {
 let curURL =  await driver.getCurrentUrl();
    expect(curURL).to.equal("http://localhost:3000/admin/user");

 //console.log(curURL);
    //expect(curURL).to.equal("http://localhost:3000/");
});

//Scenario 2: Unsuccessful Login with Invalid Password
Then("the user will be redirect to the home page.", async () => {
    let curURL =  await driver.getCurrentUrl();
    expect(curURL).to.equal("http://localhost:3000/");
	});

