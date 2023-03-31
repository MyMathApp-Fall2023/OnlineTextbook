Feature: Add Purchase Code
As the seller
So that I can provide create / discount code to specific customer 
I want to offer some specific customers a discount when they pay for the items.

Scenario: Successfully Accessing Purchase Code
    Given user is logged in and at admin page
    When clicking on purchase code page button
    Then the user should be at purchase code page and see all purchase code

Scenario: Accessing purchase code not successful
    Given user is logged in and at home page
    Then the user should not see admin button



