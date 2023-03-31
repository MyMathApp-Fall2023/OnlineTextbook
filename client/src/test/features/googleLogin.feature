Feature: Use google account to login
As a customer
So that I can manage my subscription of textbooks
I want to use my google account to login


Scenario: Get the google login page
    Given I am at the login page of the website
    When I click Google button
    Then There will be a pop-up screen to login to google account

Scenario: Successful Login with Google Account
    Given I am at the login page of the website
    When I click Google button
    And I log in to my Google account
    Then I am redirected to the main page of the website and logged in with my Google account

Scenario: Cancel Login with Google Account
    Given I am at the login page of the website
    When I click Google button
    And I choose to cancel the login process
    Then I am redirected back to the login page of the website and not logged in

Scenario: Invalid Login with Google Account
    Given I am at the login page of the website
    When I click Google button
    And I enter invalid Google account credentials
    Then an error message will be displayed, indicating that the login was unsuccessful with my Google account

Scenario: Login Timeout with Google Account
    Given I am at the login page of the website
    When I click Google button
    And the Google login page does not respond within a certain time
    Then a message will be displayed, indicating that the login with my Google account has timed out.




