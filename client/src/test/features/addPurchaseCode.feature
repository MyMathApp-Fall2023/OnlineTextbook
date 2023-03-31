Feature: Add Purchase Code
As the seller
So that I can provide create / discount code to specific customer 
I want to offer some specific customers a discount when they pay for the items.

Scenario: Successfully Accessing Purchase Code
    Given user is admin
    When clicking on purchase code page
    Then the user should be at purchase code page and see all purchase code

Scenario: Accessing purchase code not successful
    Given user is not admin
    When clicking on purchase code page
    Then throw error and return to 403

Scenario: Successful Login with Valid entries
    Given user navigates to the website lo login
    When I type 'yushuang@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then login must be successful.

