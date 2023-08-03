const { filterByAnimalNamePattern, prettifyPrint, formatStartupError, countPeopleAndAnimals } = require("./utils");
const { MODE } = require("./constants");
const { data } = require("../data");

/**
 * The main function of the app.
 *
 * @param {string[]} - An array of command-line arguments passed to the program.
 * @param {Array} - The list of countries containing people and animals to be filtered.
 * @throws {Error} Throws an error if no argument is passed to the program.
 * @throws {Error} Throws an error if the provided argument is unknown.
 * @returns {void} This function does not return a value.
 */
const main = (argv, countries) => {
    const modeArgv = argv[2];

    if (!modeArgv) {
        throw new Error(formatStartupError(
            'You need to pass an argument to use this program'
        ));
    } else if (modeArgv?.startsWith(MODE.FILTER)) {
        const pattern = modeArgv.split('=')[1];
        const result = filterByAnimalNamePattern(countries, pattern);
        prettifyPrint(result);
    } else if (modeArgv === MODE.COUNT) {
        const result = countPeopleAndAnimals(countries);
        prettifyPrint(result);
    } else {
        throw new Error(formatStartupError(
            'Unknown argument'
        ));
    }
}

module.exports = { main };
