Feature: Main

    Scenario: No Argument Provided
        Given a list of countries containing people and animals
        When the main function is called with no arguments "node app.js"
        Then the function should throw an error with the message "You need to pass an argument to use this program"

    Scenario: Unknown Argument Provided
        Given a list of countries containing people and animals
        When the main function is called with an unknown argument "node app.js abc"
        Then the function should throw an error with the message "Unknown argument"

    Scenario: Successful execution for filter mode
        Given a list of countries containing people and animals
        When the main function is called with the argument "node app.js --filter=ry"
        Then the function should filter animals whose names contain "ry" like "Oryx"

    Scenario: Successful execution for count mode
        Given a list of countries containing people and animals
        When the main function is called with the argument "node app.js --count"
        Then the function should count people in country like "Dillauti [5]" and person's animals like "Winifred Graham [6]"
