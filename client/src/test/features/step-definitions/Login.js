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
Given("user navigates to the website lo login", async () => {
	await driver.get("http://localhost:3000/login");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});

When("I type 'yushuang@me.com' and 'yushuang' as email and password", async () => {
//When("the user enters their email and password", async () => {
    driver.findElement(webdriver.By.id("email")).sendKeys("yushuang@me.com");
    driver.findElement(webdriver.By.id("password")).sendKeys("yushuang");
	await driver.sleep(6 * 1000);
});

When("I click on 'login'", async () => {
    await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/form/button`)).click();
	await driver.sleep(6 * 1000);
});

// Scenario 1: Successful Login with Valid Entries
Then("login must be successful.", async () => {
	let curURL =  await driver.getCurrentUrl();
    expect(curURL).to.equal("http://localhost:3000/");

	//console.log(curURL);
    //expect(curURL).to.equal("http://localhost:3000/");
});

//Scenario 2: Unsuccessful Login with Invalid Password
Then("the system should display an error message indicating that the login was unsuccessful due to an invalid password", async () => {
	let errorMsg = await driver.findElement(webdriver.By.className("error-message")).getText();
	expect(errorMsg).to.equal("Invalid password");
});

//Scenario 3: Unsuccessful Login with Invalid email
//Pages -》 Login ——》 LocalLoginForm ---
//js Find element , 找到页面上面的元素
Then("the system should display an error message indicating that the login was unsuccessful due to an invalid email", async () => {
	let errorMsg = await driver.findElement(webdriver.By.className("error-message")).getText();
	expect(errorMsg).to.equal("Invalid email");
});

//Scenario 4： Unsuccessful Login with Empty Fields
//前端的error message 是不是一样的？？
Then("the system should display an error message indicating that the login was unsuccessful due to empty fields", async () => {
	let errorMsg = await driver.findElement(webdriver.By.className("error-message")).getText();
	expect(errorMsg).to.equal("Please fill in all fields");
});