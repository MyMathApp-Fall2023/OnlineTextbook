Feature: Add Purchase Code
As the seller
So that I can provide create / discount code to specific customer 
I want to offer some specific customers a discount when they pay for the items.

Scenario: Adding purchase code correctly
    Given user is logged in as admin 
    When go to purchase code page url
    When type in valid purchase code
	When click the add button
    Then the purchase code should be added in

Scenario: Deleting purchase code correctly
    Given user is logged in as admin 
    When go to purchase code page url
	When click the delete button at the end of row
    Then the purchase code should be deleted
