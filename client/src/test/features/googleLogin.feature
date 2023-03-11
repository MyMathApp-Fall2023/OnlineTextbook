Feature: Use google account to login
As a customer
So that I can manage my subscription of textbooks
I want to use my google account to login


Scenario: Get the google login page
    Given I am at the login page of the website
    When I click Google button
    Then There will be a pop-up screen to login to google account
    

Scenario: Successful Login with Valid entries
    Given user navigates to the website lo login
    When I type 'yushuang@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then login must be successful.