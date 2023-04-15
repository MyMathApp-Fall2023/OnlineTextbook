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

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  

//场景
Given("user navigates to the website to sign up", async () => {
 await driver.get("http://localhost:3000/sign-up");
 await driver.sleep(3 * 1000);
 //setTimeout(myFunction, 10000);
});


When('I type conflict entities like email which exists in database', async () => {
    driver.findElement(webdriver.By.id("name")).sendKeys("yushuang");
    driver.findElement(webdriver.By.id("email")).sendKeys("yushuang@me.com");
    driver.findElement(webdriver.By.id("confirmEmail")).sendKeys("yushuang@me.com");
    driver.findElement(webdriver.By.id("password")).sendKeys("123");
    driver.findElement(webdriver.By.id("confirmPassword")).sendKeys("123");
    await driver.sleep(6 * 1000);
});


When('I type valid entities including Name and Email and password', async () => {
//When("the user enters their email and password", async () => {
    const randomName = generateRandomString(10); // generates a random string of length 10
    const randomEmail = randomName + '@me.com'

    driver.findElement(webdriver.By.id("name")).sendKeys(randomName);
    driver.findElement(webdriver.By.id("email")).sendKeys(randomEmail);
    driver.findElement(webdriver.By.id("confirmEmail")).sendKeys(randomEmail);
    driver.findElement(webdriver.By.id("password")).sendKeys("123");
    driver.findElement(webdriver.By.id("confirmPassword")).sendKeys("123");
 await driver.sleep(6 * 1000);
});

When("I click on 'sign up'", async () => {
    await driver.findElement(webdriver.By.className("ui green active fluid button")).click();
    //await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/form/button`)).click();
    await driver.sleep(6 * 1000);
});

// Scenario 1: Successful Login with Valid Entries
Then("sign up must be successful.", async () => {
    let successMsg = await driver.findElement(webdriver.By.className("ui success message")).getText();
    //let successMsg = successClass.f .getText()
    //console.log(successMsg)
    expect(successMsg).to.contains("SUCCESS");
     //console.log(curURL);
    //expect(curURL).to.equal("http://localhost:3000/");
});

//Scenario 2: Unsuccessful Login with Invalid Passwordcd
Then('sign up must be failed.', async () => {
 let errorMsg = await driver.findElement(webdriver.By.className("ui error message")).getText();
 expect(errorMsg).to.contains("Error");
});

