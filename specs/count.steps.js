const { defineFeature, loadFeature } = require('jest-cucumber');
const { deepCopy, countPeopleAndAnimals } = require('../src/utils');
const { data } = require('../data');

const feature = loadFeature('specs/features/count.feature');

defineFeature(feature, test => {
    test('Counting People and Animals in Countries', ({ given, when, then }) => {
        let result;
        let countries;
        given('a list of countries containing people and animals', () => {
            countries = data;
        });
        when('the countPeopleAndAnimals function is called with the countries', () => {
            result = countPeopleAndAnimals(countries);
        });
        then('the function should return a list of countries with counts of people and their respective animals appended to their names', names => {
            result = JSON.stringify(result);
            names.forEach(({ name, count }) => expect(result).toContain(`${name} [${count}]`));
        });
    });

    test('Counting with Non-Array Countries Parameter', ({ given, when, then }) => {
        let countriesParameter;
        let catchedError;
        given(/an invalid countries parameter that is not an array "(.*)"$/, parameter => {
            countriesParameter = parameter;
        });
        when('the countPeopleAndAnimals function is called with the invalid countries parameter', () => {
            try {
                result = countPeopleAndAnimals(countriesParameter);
            } catch (error) {
                catchedError = error;
            }
        });
        then(/the function should throw an error with the message "(.*)"$/, error => {
            expect(catchedError.message).toContain(error);
        });
    });

    test('Counting in Empty List of Countries', ({ given, when, then }) => {
        let result;
        let countries;
        given('an empty list of countries', () => {
            countries = [];
        });
        when('the countPeopleAndAnimals function is called with the empty list', () => {
            result = countPeopleAndAnimals(countries);
        });
        then('the function should return an empty list', () => {
            expect(result.length).toBe(0);
        });
    });

    test('Counting in List with No People', ({ given, when, then }) => {
        let result;
        let countries;
        given('a list of countries containing no people', () => {
            countries = deepCopy(data).map(country => {
                country.people = [];
                return country;
            });
        });
        when('the countPeopleAndAnimals function is called with the countries', () => {
            result = countPeopleAndAnimals(countries);
        });
        then('the function should return a list of countries with counts of people appended to their names equal to 0', () => {
            result.forEach(country => {
                expect(country.name).toContain('[0]');
            });
        });
    });

    test('Counting in List with No Animals', ({ given, when, then }) => {
        let result;
        let countries;
        given('a list of countries containing people with no animals', () => {
            countries = deepCopy(data).map(country => {
                country.people.forEach(person => {
                    person.animals = [];
                });
                return country;
            });
        });
        when('the countPeopleAndAnimals function is called with the countries', () => {
            result = countPeopleAndAnimals(countries);
        });
        then('the function should return a list of countries with counts of people appended to their names, and the animals list of each person should be empty', () => {
            result.forEach(country => {
                country.people.forEach(person => {
                    expect(person.name).toContain('[0]');
                });
            });
        });
    });
});
