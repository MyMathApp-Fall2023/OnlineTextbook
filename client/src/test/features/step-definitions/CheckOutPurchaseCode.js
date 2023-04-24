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


// Given I am on the checkout page
// When I enter a valid purchase code
// When I click the apply button
//场景
Given("I am on the checkout page", async () => {
	await driver.get("http://localhost:3000/checkout/0");
	await driver.sleep(6 * 1000);
});


When("I enter a valid purchase code",  async () => {
	//driver.findElement(webdriver.By.id("purchasecode")).sendKeys("FUCKGIT");
	//await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/table/tbody/tr/td[4]/div/input`)).sendKeys("FUCKGIT");
	//*[@id="root"]/div/main/div/table/tbody/tr/td[4]/div/input
	driver.findElement(webdriver.By.id("purchasecode")).sendKeys("FUCKGIT");
	//let temp = await driver.findElement(webdriver.By.className("ui input"));
	//let temp = await driver.findElement(webdriver.By.tagName("li"));
	//await temp.findElement(webdriver.By.name("purchasecode")).sendKeys("FUCKGIT");
	//List<WebElement> elements = driver.findElements(By.tagName("input"));
	//*[@id="root"]/div/main/div/table/tbody/tr/td[4]/div/input
	await driver.sleep(3 * 1000);
});


When("I click the apply button", async () => {
	await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/table/tbody/tr/td[5]/button`)).click();
	await driver.sleep(6 * 1000);
});


// Scenario 1 Checkout:  Checking out with a valid purchase code succussfully
// Then the purchase code should be applied and the discount should be reflected in the total amount to be paid
Then("the purchase code should be applied", async () => {
	let successMsg = await driver.findElement(webdriver.By.className("ui success message")).getText();
	expect(successMsg).to.contains("SUCCESS");
});


// Scenario 2: Checking out with an invalid purchase code
// Then an error message should be displayed, indicating that the purchase code is invalid
When("I enter an invalid purchase code",  async () => {
	//driver.findElement(webdriver.By.id("purchasecode")).sendKeys("FUCKGIT");
	//await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/table/tbody/tr/td[4]/div/input`)).sendKeys("FUCKGIT");
	//*[@id="root"]/div/main/div/table/tbody/tr/td[4]/div/input
	driver.findElement(webdriver.By.id("purchasecode")).sendKeys("duyun");
	//let temp = await driver.findElement(webdriver.By.className("ui input"));
	//let temp = await driver.findElement(webdriver.By.tagName("li"));
	//await temp.findElement(webdriver.By.name("purchasecode")).sendKeys("FUCKGIT");
	//List<WebElement> elements = driver.findElements(By.tagName("input"));
	//*[@id="root"]/div/main/div/table/tbody/tr/td[4]/div/input
	await driver.sleep(3 * 1000);
});


Then("an error message should be displayed", async () => {
	let successMsg = await driver.findElement(webdriver.By.className("ui error message")).getText();
	expect(successMsg).to.contains("ERROR");
});


