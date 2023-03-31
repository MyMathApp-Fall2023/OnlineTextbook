Feature: Use genreal account to login
As a customer
So that I can manage my subscription of textbooks
I want to use my genreal account to login

Scenario: Successful Login with Valid entries
    Given user navigates to the website to login
    Given user navigates to the website to login
    When I type 'yushuang@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then login must be successful.

Scenario: Unsuccessful Login with Invalid Password
    Given user navigates to the website to login
    When I type 'yushuang@me.com' and 'yushuang123' as email and password
    And I click on 'login'
    Then unsuccessful login due to an invalid password.

Scenario: Unsuccessful Login with Invalid Email
    Given user navigates to the website to login
    When I type 'dddddddd@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then unsuccessful login due to an invalid email.


