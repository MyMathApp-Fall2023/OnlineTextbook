Feature: Use genreal account to login
As a customer
So that I can manage my subscription of textbooks
I want to use my genreal account to login

Scenario: Successful Login with Valid entries
    Given user navigates to the website to login
    When I type 'yushuang@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then login must be successful.

Scenario: Unsuccessful Login with Invalid Password
    Given user navigates to the website to login
    When I type 'yushuang@me.com' and 'yushuangsdede' as email and password
    And I click on 'login'
    Then login failed due to invalid password.

Scenario: Unsuccessful Login with Invalid Email

    Given user navigates to the website to login
    When I type 'yushuasdeng@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then login failed due to invalid email.
