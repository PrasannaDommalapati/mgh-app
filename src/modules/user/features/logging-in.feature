Feature: Logging In

  Scenario: Log in as Organisation Admin

    Given I am on the "login" page
    When  I log in as an "Organisation Admin"
    Then  I will be redirected to the "dashboard" page