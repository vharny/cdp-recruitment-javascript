const { defineFeature, loadFeature } = require('jest-cucumber');
const { filterByAnimalNamePattern } = require('../src/utils');
const { data } = require('../data');

const feature = loadFeature('specs/features/filter.feature');

defineFeature(feature, test => {
    test('Filtering with Matching Animal Names', ({ given, when, then, and }) => {
        let result;
        let countries;
        given('a list of countries containing people and animals', () => {
            countries = data;
        });
        when(/the filterByAnimalNamePattern function is called with the countries and the pattern "(.*)"$/, pattern => {
            result = filterByAnimalNamePattern(countries, pattern);
        });
        then("the function should return a list of countries, people, and animals that have the following animal names", names => {
            result = JSON.stringify(result);
            names.forEach(({ name }) => expect(result).toContain(name));
        });
    });

    test('Filtering with No Matching Animal Names', ({ given, when, then }) => {
        let result;
        let countries;
        given('a list of countries containing people and animals', () => {
            countries = data;
        });
        when(/the filterByAnimalNamePattern function is called with the countries and the pattern "(.*)"$/, pattern => {
            result = filterByAnimalNamePattern(countries, pattern);
        });
        then("the function should return an empty list", () => {
            expect(result.length).toBe(0);
        });
    });

    test('Filtering with Non-Array Countries Parameter', ({ given, when, then }) => {
        let countriesParameter;
        let catchedError;
        given(/an invalid countries parameter that is not an array "(.*)"$/, parameter => {
            countriesParameter = parameter
        });
        when(/the filterByAnimalNamePattern function is called with the invalid countries parameter and the pattern "(.*)"$/, pattern => {
            try {
                result = filterByAnimalNamePattern(countriesParameter, pattern);
            } catch (error) {
                catchedError = error;
            }
        });
        then(/the function should throw an error with the message "(.*)"$/, error => {
            expect(catchedError.message).toContain(error);
        });
    });

    test('Filtering with Non-String Pattern Parameter', ({ given, when, then }) => {
        let patternParameter;
        let catchedError;
        given(/an invalid pattern parameter that is not a string "(.*)"$/, parameter => {
            patternParameter = Number(parameter);
        });
        when("the filterByAnimalNamePattern function is called with the countries and the invalid pattern parameter", () => {
            try {
                result = filterByAnimalNamePattern(data, patternParameter);
            } catch (error) {
                catchedError = error;
            }
        });
        then(/the function should throw an error with the message "(.*)"$/, error => {
            expect(catchedError.message).toContain(error);
        });
    });
});