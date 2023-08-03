const { defineFeature, loadFeature } = require('jest-cucumber');
const { main } = require('../src/main');
const { data } = require('../data');

const feature = loadFeature('specs/features/main.feature');

const commandToArgv = (command) => command.split(' ');

defineFeature(feature, test => {
    test('No Argument Provided', ({ given, when, then }) => {
        let catchedError;
        let countries;
        given('a list of countries containing people and animals', () => {
            countries = data;
        });
        when(/the main function is called with no arguments "(.*)"$/, (command) => {
            try {
                main(commandToArgv(command), countries);
            } catch (error) {
                catchedError = error;
            }
        });
        then(/the function should throw an error with the message "(.*)"$/, (error) => {
            expect(catchedError.message).toContain(error);
        });
    });

    test('Unknown Argument Provided', ({ given, when, then }) => {
        let catchedError;
        let countries;
        given('a list of countries containing people and animals', () => {
            countries = data;
        });
        when(/the main function is called with an unknown argument "(.*)"$/, (command) => {
            try {
                main(commandToArgv(command), countries);
            } catch (error) {
                catchedError = error;
            }
        });
        then(/the function should throw an error with the message "(.*)"$/, (error) => {
            expect(catchedError.message).toContain(error);
        });
    });

    test('Successful execution for filter mode', ({ given, when, then }) => {
        console.log = jest.fn();
        let countries;
        given('a list of countries containing people and animals', () => {
            countries = data;
        });
        when(/the main function is called with the argument "(.*)"$/, (command) => {
            main(commandToArgv(command), countries);
        });
        then(/the function should filter animals whose names contain "ry" like "(.*)"$/, (name) => {
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(name));
        });
    });

    test('Successful execution for count mode', ({ given, when, then }) => {
        console.log = jest.fn();
        let countries;
        given('a list of countries containing people and animals', () => {
            countries = data;
        });
        when(/the main function is called with the argument "(.*)"$/, (command) => {
            main(commandToArgv(command), countries);
        });
        then(/the function should count people in country like "(.*)" and person's animals like "(.*)"$/, (people, animals) => {
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(people));
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining(animals));
        });
    });
});