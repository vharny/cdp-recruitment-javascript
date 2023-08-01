const { filterByAnimalNamePattern, prettifyPrint, formatStartupError } = require("./utils");
const { MODE } = require("./constants");
const { data } = require("../data");

/**
 * The main function of the app.
 *
 * @param {string[]} [argv=process.argv] - An array of command-line arguments passed to the program. (Optional)
 * @param {Array} [countries=data] - The list of countries containing people and animals to be filtered. (Optional)
 * @throws {Error} Throws an error if no argument is passed to the program.
 * @throws {Error} Throws an error if the provided argument is unknown.
 * @returns {void} This function does not return a value.
 */
const main = (argv = process.argv, countries = data) => {
    const modeArgv = argv[2];

    if (!modeArgv) {
        throw new Error(formatStartupError(
            'You need to pass an argument to use this program'
        ));
    } else if (modeArgv?.startsWith(MODE.FILTER)) {
        const pattern = modeArgv.split('=')[1];
        const result = filterByAnimalNamePattern(countries, pattern);
        prettifyPrint(result);
    } else {
        throw new Error(formatStartupError(
            'Unknown argument'
        ));
    }
}

module.exports = { main }
