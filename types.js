/**
 * @typedef {object} ConsoleAnsi
 * @property {string} [prefix=""] A string to prepend to every log.
 * @property {ConsoleAnsiTheme} [theme] Color definition associated to console methods.
 * @property {ConsoleAnsiLevel} [level="log"] A minimum log level value. See ConsoleAnsiLevels.
 * @property {ConsoleAnsiLevels} [levels={ error: 5, warn: 4, info: 3, log: 2 }] Numbered priority associated to console methods to match above for level property.
 * @property {ConsoleAnsiSymbol} [symbol={ log: "✔", info: "ℹ", warn: "⚠", error: "✖" }] Unicode symbols to prepend to defined console methods.
 * @property {boolean} [noColor=false] Disable color ansi sequence.
 */

/**
 * @typedef {number[]} ConsoleAnsiThemeAttributeArray Array for ANSI definition [start, end].
 */

/**
 * @typedef {Object.<string, ConsoleAnsiThemeAttributeArray>|Object.<string, ConsoleAnsiThemeAttributeArray[]>} ConsoleAnsiTheme Theme object consisting of ANSI styles or Array of ANSI styles.
 */

/**
 * @typedef {string} ConsoleAnsiLevel Current log level. Can be any console method but levels property only defines log(1)/info(2)/warn(3)/error(4).
 */

/**
 * @typedef {Object.<ConsoleAnsiLevel, number>} ConsoleAnsiLevels Levels object consisting of console method as keys and numbered priority.
 */

/**
 * @typedef {Object.<string, string>} ConsoleAnsiSymbol Map of unicode symbols to be prepended to certain console methods.
 */

export {};
