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
Given("user navigates to the website to login", async () => {
	await driver.get("http://localhost:3000/login");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});



When("I type {string} and {string} as email and password",  async (email, password) => {
//When("the user enters their email and password", async () => {
    driver.findElement(webdriver.By.id("email")).sendKeys(email);
    driver.findElement(webdriver.By.id("password")).sendKeys(password);
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
Then("unsuccessful login due to an invalid password.", async () => {
	let errorMsg = await driver.findElement(webdriver.By.className("ui error message")).getText();
	expect(errorMsg).to.equal("Incorrect email or password. Please ensure your email and password are correct and try again.");
});

//Scenario 3: Unsuccessful Login with Invalid email
//Pages -》 Login ——》 LocalLoginForm ---
//js Find element , 找到页面上面的元素
Then("unsuccessful login due to an invalid email.", async () => {
	let errorMsg = await driver.findElement(webdriver.By.className("ui error message")).getText();
	expect(errorMsg).to.equal("Incorrect email or password. Please ensure your email and password are correct and try again.");
});





//-----user confirmation-----


/*Scenario4: Unsuccessful Login with unconfirmed email
Given user sign up and navigates to the website to login without confirming
When I type 'dddddddd@me.com' and 'yushuang' as email and password
And I click on 'login'
Then unsuccessful login due to an email address unconfirmed.*/

function generateRandomString(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const randomName = generateRandomString(10); // generates a random string of length 10
const randomEmail = randomName + '@me.com'
Given("user sign up and navigates to the website to login without confirming", async () => {
    //sign up:
    await driver.get("http://localhost:3000/sign-up");
    await driver.sleep(3 * 1000);

    driver.findElement(webdriver.By.id("name")).sendKeys(randomName);
    driver.findElement(webdriver.By.id("email")).sendKeys(randomEmail);
    driver.findElement(webdriver.By.id("confirmEmail")).sendKeys(randomEmail);
    driver.findElement(webdriver.By.id("password")).sendKeys("123");
    driver.findElement(webdriver.By.id("confirmPassword")).sendKeys("123");
    await driver.sleep(6 * 1000);

    await driver.findElement(webdriver.By.className("ui green active fluid button")).click();
    await driver.sleep(6 * 1000);

    await driver.get("http://localhost:3000/login");
    await driver.sleep(3 * 1000);
    //setTimeout(myFunction, 10000);
});

When("I type in email and password",  async () => {
//When("the user enters their email and password", async () => {
    driver.findElement(webdriver.By.id("email")).sendKeys(randomEmail);
    driver.findElement(webdriver.By.id("password")).sendKeys("123");
    await driver.sleep(6 * 1000);
});

Then("unsuccessful login due to an email address unconfirmed", async () => {
    await driver.sleep(6 * 1000);
    let errorMsg = await driver.findElement(webdriver.By.className("ui error message")).getText();
    expect(errorMsg).to.equal("Account is not activated. Please check your email to confirm your account.");
});





//Scenario 5: Successful activation

//Scenario: Successful activation
//    Given user sign up
//    When user go to the activate url
//    Then account is activated in activate link

Given("user sign up", async () => {
    //sign up:
    await driver.get("http://localhost:3000/sign-up");
    await driver.sleep(3 * 1000);

    driver.findElement(webdriver.By.id("name")).sendKeys(randomName);
    driver.findElement(webdriver.By.id("email")).sendKeys(randomEmail);
    driver.findElement(webdriver.By.id("confirmEmail")).sendKeys(randomEmail);
    driver.findElement(webdriver.By.id("password")).sendKeys("123");
    driver.findElement(webdriver.By.id("confirmPassword")).sendKeys("123");
    await driver.sleep(6 * 1000);

    await driver.findElement(webdriver.By.className("ui green active fluid button")).click();
    await driver.sleep(6 * 1000);

    //setTimeout(myFunction, 10000);
});
When("user go to the activate url from email",  async () => {
    //confirm:
    await driver.get("http://localhost:3000/activate?activationCode=naomi2049"+randomName+"114514");
    await driver.sleep(6 * 1000);
});
Then("account is activated in activate link", async () => {
    let successMsg = await driver.findElement(webdriver.By.className("ui segment")).getText();
    expect(successMsg).to.equal("Your account has been activated. Please login with the email and password of your account.");
});



/*
Scenario 6: Unsuccessful activation due to wrong url
    Given user sign up
    When user go to wrong activate url
    Then account is not activated in activate link
*/
When("user go to wrong activate url",  async () => {
    //confirm:
    await driver.get("http://localhost:3000/activate?activationCode=h234234");
    await driver.sleep(6 * 1000);
});
Then("account is not activated in activate link", async () => {
    let Msg = await driver.findElement(webdriver.By.className("ui segment")).getText();
    expect(Msg).to.equal("This activation code is not associated with any account. Please sign up.");
});

