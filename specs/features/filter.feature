Feature: Filter

    Scenario: Filtering with Matching Animal Names
        Given a list of countries containing people and animals
        When the filterByAnimalNamePattern function is called with the countries and the pattern "ry"
        Then the function should return a list of countries, people, and animals that have the following animal names
            | name      |
            | John Dory |
            | Oryx      |

    Scenario: Filtering with No Matching Animal Names
        Given a list of countries containing people and animals
        When the filterByAnimalNamePattern function is called with the countries and the pattern "xyz"
        Then the function should return an empty list

    Scenario: Filtering with Non-Array Countries Parameter
        Given an invalid countries parameter that is not an array "abc"
        When the filterByAnimalNamePattern function is called with the invalid countries parameter and the pattern "abc"
        Then the function should throw an error with the message "Countries parameter is not an array."

    Scenario: Filtering with Non-String Pattern Parameter
        Given an invalid pattern parameter that is not a string "123"
        When the filterByAnimalNamePattern function is called with the countries and the invalid pattern parameter
        Then the function should throw an error with the message "Pattern parameter must be a non-empty string."
