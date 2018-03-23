@Auth
Feature: Logging In

  Scenario: Logging in as an Admin
    Given I am on the "login" page
    When  I log in as an "admin"
    Then  I will be redirected to the "dashboard/admin" page

  Scenario: Logging out
    Given I am logged in as "admin"
    When  I open the menu
    And   I click on the logout button
    Then  I will be redirected to the "login" page

  Scenario: Logged out user can't view dashboard page
    Given I am on the "login" page
    When  I navigate to the "dashboard/admin" page
    Then  I will be redirected to the "login" page

  Scenario: Logged in user can't view login page
    Given I am logged in as "admin"
    When  I navigate to the "login" page
    Then  I will be redirected to the "dashboard/admin" page
