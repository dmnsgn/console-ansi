/**
 * @typedef {number[]} ConsoleAnsiThemeAttributeArray Array for ANSI definition [start, end].
 */

/**
 * @typedef {(Object.<string, ConsoleAnsiThemeAttributeArray>|Object.<string, ConsoleAnsiThemeAttributeArray[]>)} ConsoleAnsiTheme Theme object consisting of ANSI styles or Array of ANSI styles.
 */

/**
 * @typedef {string} ConsoleAnsiLevel Current log level. Can be any console method but levels property only defines log(1)/info(2)/warn(3)/error(4).
 */

/**
 * @typedef {(Object.<ConsoleAnsiLevel, number>)} ConsoleAnsiLevels Levels object consisting of console method as keys and numbered priority.
 */

/**
 * @typedef {Object.<string, string>} ConsoleAnsiSymbol Map of unicode symbols to be prepended to certain console methods.
 */
