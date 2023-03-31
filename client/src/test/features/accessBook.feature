Feature: Access purchased textbook
As a current user
So that I can read the textbook that I purchased.
I want to be recognized as a user who has purchased the textbooks and be able to read them before expiration. 

Scenario: Successfully Accessing purchased textbook
    Given user is logged in and their status is valid
    When I clicked the 
    And 
    Then I should see the purchased book

Scenario: Accessing purchased textbook not successful
    Given user is not logged in and their status is not valid
    When I clicked the 
    And 
    Then I should be directed to login page

Scenario: Successful Login with Valid entries
    Given user navigates to the website lo login
    When I type 'yushuang@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then login must be successful.


