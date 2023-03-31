Feature: Use genreal account to login
As a customer
So that I can manage my subscription of textbooks
I want to use my genreal account to login

Scenario: Successful Login with Valid entries
    Given user navigates to the website lo login
    When I type 'yushuang@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then login must be successful.

Scenario: Unsuccessful Login with Invalid Password
    Given the user navigates to the website to login
    When the user enters their email 'yushuang@me.com' and an invalid password, such as 'yushuang123'
    And the user clicks on the 'login' button
    Then the system should display an error message indicating that the login was unsuccessful due to an invalid password.

Scenario: Unsuccessful Login with Invalid Email

    Given the user navigates to the website to login
    When the user enters an invalid email and a valid password
    And the user clicks on the 'login' button
    Then the system should display an error message indicating that the login was unsuccessful due to an invalid email

Scenario: Unsuccessful Login with Empty Fields

Given the user navigates to the website to login
When the user leaves the email and/or password field empty
And the user clicks on the 'login' button
Then the system should display an error message indicating that the login was unsuccessful due to empty fields.




