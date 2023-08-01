/**
 * Creates a deep copy of the given data by using JSON.parse and JSON.stringify methods.
 * This method can be used to create a new, independent copy of the original data, including nested objects and arrays.
 *
 * @param {any} data - The data to be deep copied.
 * @returns {any} A new deep copy of the input data.
 */
const deepCopy = (data) => JSON.parse(JSON.stringify(data));

/**
 * Pretty prints the given data to the console using JSON.stringify with indentation.
 *
 * @param {any} data - The data to be pretty printed.
 * @returns {void} This function does not return a value.
 */
const prettifyPrint = (data) => console.log(JSON.stringify(data, null, 2));

/**
 * Formats an error message for a startup error by appending additional information about how to use the program.
 *
 * @param {string} errorMessage - The error message to format.
 * @returns {string} The formatted error message with additional information.
 */
const formatStartupError = (errorMessage) => errorMessage +
    '\n\nExamples:\n' +
    '$ node app.js --filter=ry\n\n';

/**
* Filters a list of countries, people, and animals to keep only people with animals
* whose names contain the specified pattern.
*
* @param {Array} countries - The list of countries containing people and animals to filter.
* @param {string} pattern - The pattern to search for in the animal names.
* @throws {Error} Throws an error if the `countries` parameter is not an array.
* @throws {Error} Throws an error if the `pattern` parameter is not a non-empty string.
* @returns {Array} The filtered list of countries, people, and animals.
*/
const filterByAnimalNamePattern = (countries, pattern) => {
    if (!Array.isArray(countries)) {
        throw new Error('Countries parameter is not an array.');
    }
    if (!pattern || typeof pattern !== 'string') {
        throw new Error('Pattern parameter must be a non-empty string');
    }
    return deepCopy(countries).reduce((accumulator, country) => {
        const people = [];
        country.people.forEach(person => {
            const animals = person.animals.filter(animal => animal.name.includes(pattern));
            if (animals.length > 0) {
                people.push({ name: person.name, animals });
            }
        });
        if (people.length > 0) {
            accumulator.push({ name: country.name, people })
        }
        return accumulator;
    }, []);
};

module.exports = {
    prettifyPrint,
    formatStartupError,
    filterByAnimalNamePattern,
};
