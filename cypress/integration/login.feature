Feature: Login and log out

    Scenario Outline: As a User I want to log in
        Given I open the website
        Then I am logged in as '<userType>'
        And I can log out
        Examples:
            | userType                |
            | standard_user           |
            | problem_user            |
            | performance_glitch_user |
