Feature: Access Records Page
As the user
So that I can check my records and expiration date in record page 
I want to manage the customer info

Scenario: Failed accessing record page as not login
    Given user is in main page
    When not login  
    And go to the record url
    Then the user will be redirect to main page.

Scenario: Successfully accessing record page as a user
    Given user is in main page
    When login as user
    And go to the record url
    Then the user will see the record table.

