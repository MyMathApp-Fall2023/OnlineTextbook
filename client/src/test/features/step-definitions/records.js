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
Given("user is in main page", async () => {
	await driver.get("http://localhost:3000/");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});



When("login as user",  async () => {
//When("the user enters their email and password", async () => {

    await driver.get("http://localhost:3000/login");
    await driver.sleep(3 * 1000);

    driver.findElement(webdriver.By.id("email")).sendKeys("ncc@me.com");
    driver.findElement(webdriver.By.id("password")).sendKeys("ncc");
	await driver.sleep(3 * 1000);
    await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/form/button`)).click();
 	await driver.sleep(6 * 1000);

	    await driver.get("http://localhost:3000/");
	    await driver.sleep(3 * 1000);

});

When("not login",  async () => {
    //When("the user enters their email and password", async () => {
    });


When("go to the record url",  async () => {
    await driver.get("http://localhost:3000/records");
    await driver.sleep(3 * 1000);
        //When("the user enters their email and password", async () => {
        });
    
// Scenario 1: Successful Login with Valid Entries
Then("the user will see the record table.", async () => {
 let curURL =  await driver.getCurrentUrl();
    expect(curURL).to.equal("http://localhost:3000/records");

 //console.log(curURL);
    //expect(curURL).to.equal("http://localhost:3000/");
});

//Scenario 2: Unsuccessful Login with Invalid Password
Then("the user will be redirect to main page.", async () => {
    let curURL =  await driver.getCurrentUrl();
    expect(curURL).to.equal("http://localhost:3000/");
	});

