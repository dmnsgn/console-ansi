/**
 * Labelled methods (`count`/`countReset`, `time`/`timeLog`/`timeEnd`) use the `count` and `time` theme and symbol. Their styled output is the native label key: keep `prefix`, `theme`, `symbol` and `noColor` unchanged between related calls.
 *
 * @typedef {object} ConsoleAnsi
 * @property {string} [prefix=""] A string to prepend to every log.
 * @property {ConsoleAnsiTheme} [theme] Color definition associated to console methods. Merged with defaults.
 * @property {ConsoleAnsiLevel} [level="debug"] A minimum log level value. See ConsoleAnsiLevels.
 * @property {ConsoleAnsiLevels} [levels={ error: 5, warn: 4, info: 3, log: 2, debug: 1, trace: 1 }] Numbered priority associated to console methods to match above for level property. Merged with defaults.
 * @property {ConsoleAnsiSymbol} [symbol] Unicode symbols to prepend to defined console methods. Merged with defaults. Defaults to a symbol per method, see [source](https://github.com/dmnsgn/console-ansi/blob/main/index.js).
 * @property {boolean} [noColor=false] Disable color ansi sequence.
 */

/**
 * @typedef {number[]} ConsoleAnsiThemeAttributeArray Array for ANSI definition [start, end].
 */

/**
 * @typedef {Object.<string, ConsoleAnsiThemeAttributeArray>|Object.<string, ConsoleAnsiThemeAttributeArray[]>} ConsoleAnsiTheme Theme object consisting of ANSI styles or Array of ANSI styles.
 */

/**
 * @typedef {string} ConsoleAnsiLevel Current log level. Methods missing from levels are always shown.
 */

/**
 * @typedef {Object.<ConsoleAnsiLevel, number>} ConsoleAnsiLevels Levels object consisting of console method as keys and numbered priority.
 */

/**
 * @typedef {Object.<string, string>} ConsoleAnsiSymbol Map of unicode symbols to be prepended to certain console methods.
 */

export {};
