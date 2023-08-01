Feature: Count

    Scenario: Counting People and Animals in Countries
        Given a list of countries containing people and animals
        When the countPeopleAndAnimals function is called with the countries
        Then the function should return a list of countries with counts of people and their respective animals appended to their names
            | type    | name            | count |
            | country | Dillauti        | 5     |
            | people  | Winifred Graham | 6     |
            | people  | Blanche Viciani | 8     |
            | people  | Philip Murray   | 7     |
            | country | Tohabdal        | 8     |

    Scenario: Counting with Non-Array Countries Parameter
        Given an invalid countries parameter that is not an array "abc"
        When the countPeopleAndAnimals function is called with the invalid countries parameter
        Then the function should throw an error with the message "Countries parameter is not an array."

    Scenario: Counting in Empty List of Countries
        Given an empty list of countries
        When the countPeopleAndAnimals function is called with the empty list
        Then the function should return an empty list

    Scenario: Counting in List with No People
        Given a list of countries containing no people
        When the countPeopleAndAnimals function is called with the countries
        Then the function should return a list of countries with counts of people appended to their names equal to 0

    Scenario: Counting in List with No Animals
        Given a list of countries containing people with no animals
        When the countPeopleAndAnimals function is called with the countries
        Then the function should return a list of countries with counts of people appended to their names, and the animals list of each person should be empty
