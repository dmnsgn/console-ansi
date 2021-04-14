/**
 * @module consoleAnsi
 */

import styles from "./styles.js";

/**
 * Escape number for ANSI sequence
 *
 * @private
 * @param {number} n
 * @returns {string}
 */
const escape = (n) => `\u001B[${n}m`;

/**
 * Console methods that require special formatting
 *
 * @private
 */
const labelled = ["time", "timeLog", "timeEnd", "count", "countReset"];

/**
 * Export a Proxy object to automatically style the console with ANSI strings.
 *
 * @alias module:consoleAnsi
 * @type {Proxy}
 * @property {string} [prefix=``] A string to prepend to every log.
 * @property {import("./types.js").ConsoleAnsiTheme} [theme] Color definition associated to console methods.
 * @property {import("./types.js").ConsoleAnsiLevel} [level="log"] A minimum log level value. See ConsoleAnsiLevels.
 * @property {import("./types.js").ConsoleAnsiLevels} [levels={ error: 5, warn: 4, info: 3, log: 2 }] Numbered priority associated to console methods to match above for level property.
 * @property {import("./types.js").ConsoleAnsiSymbol} [symbol={ log: "✔", info: "ℹ", warn: "⚠", error: "✖" }] Unicode symbols to prepend to defined console methods.
 */
const proxiedConsole = new Proxy(
  {
    prefix: "",
    theme: {
      debug: styles.white,
      log: styles.green,
      info: styles.blue,
      warn: styles.yellow,
      error: styles.red,
      trace: styles.blue,

      count: styles.white,
      countReset: styles.white,
      group: styles.gray,
      groupEnd: styles.gray,
      time: styles.cyan,
      timeLog: styles.cyan,
      timeEnd: styles.cyan,

      // Not supported, they already have some coloring
      // dir: // use second argument { colors: true }
      // table:
    },
    levels: {
      error: 5,
      warn: 4,
      info: 3,
      log: 2,
    },
    level: "log",
    symbol: {
      log: "✔",
      info: "ℹ",
      warn: "⚠",
      error: "✖",
    },
  },
  {
    get: (obj, prop) =>
      prop in obj
        ? obj[prop]
        : !obj.levels.hasOwnProperty(prop) || // eslint-disable-line no-prototype-builtins
          (obj.levels[obj.level] || 0) <= (obj.levels[prop] || 0)
        ? Object.keys(obj.theme).includes(prop)
          ? (...args) => {
              const symbolProp = obj.symbol[prop];

              let themeProp = !Array.isArray(obj.theme[prop][0])
                ? [obj.theme[prop]]
                : obj.theme[prop];

              const attributes = themeProp.reduce(
                (str, style) => [
                  `${str[0]}${escape(style[0])}`,
                  `${str[1]}${escape(style[1])}`,
                ],
                ["", ""]
              );

              const isLabelled = labelled.includes(prop);

              return console[prop](
                `${attributes[0]}${[
                  symbolProp,
                  obj.prefix,
                  isLabelled && args[0],
                ]
                  .filter(Boolean)
                  .join(" ")}`,
                ...(args.slice(isLabelled ? 1 : 0) || []),
                attributes[1]
              );
            }
          : console[prop]
        : () => {},
  }
);

export default proxiedConsole;
