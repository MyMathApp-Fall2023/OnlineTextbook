Feature: Access purchased textbook
As a current user
So that I can read the textbook that I purchased.
I want to be recognized as a user who has purchased the textbooks and be able to read them before expiration. 

Scenario: Successfully Accessing purchased textbook
    Given user is logged in
    When I clicked the read book button
    Then I should see the purchased book

Scenario: Accessing purchased textbook without logging in
    Given user is not logged in
    When I clicked the read book button
    Then I should be directed to login page

Scenario: Accessing purchased textbook not successful
    Given user is logged in but status is not valid
    When I clicked the read book button
    Then I should be directed to purchase book page



