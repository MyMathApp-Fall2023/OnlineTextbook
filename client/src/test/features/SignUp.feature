Feature: Use genreal account to sign up
As a customer
So that I can manage my subscription of textbooks
I want to use my genreal account to sign up 

Scenario: Successful sign up with Valid entries
    Given user navigates to the website to sign up
    When I type valid entities including Name and Email and password
    And I click on 'sign up'
    Then sign up must be successful.

Scenario: Failed sign up with duplicate entries
    Given user navigates to the website to sign up
    When I type conflict entities like email which exists in database
    And I click on 'sign up'
    Then sign up must be failed.