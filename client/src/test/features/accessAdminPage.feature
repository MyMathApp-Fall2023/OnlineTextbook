Feature: Access Admin Page
As the seller
So that I can access the user transaction purchase code in my admin page 
I want to manage the customer info

Scenario: Failed accessing admin page as general user
    Given user is in home page
    When not login as admin 
    And go to the admin url
    Then the user will be redirect to the home page.

