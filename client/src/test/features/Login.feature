Feature: Use genreal account to login
As a customer
So that I can manage my subscription of textbooks
I want to use my genreal account to login

Scenario: Successful Login with Valid entries
    Given user navigates to the website lo login
    When I type 'yushuang@me.com' and 'yushuang' as email and password
    And I click on 'login'
    Then login must be successful.
