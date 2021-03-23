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
 * Export a Proxy object to automatically style the console with ANSI strings.
 *
 * @alias module:consoleAnsi
 * @type {Proxy}
 * @property {string} [prefix=``] A string to prepend to every log.
 * @property {ConsoleAnsiTheme} [theme]
 * @property {ConsoleAnsiSymbol} [symbol]
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

      // Not supported
      // dir: // use second argument { colors: true }
      // table:
    },
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
        : Object.keys(obj.theme).includes(prop)
        ? (...args) => {
            const symbolProp = obj.symbol[prop];

            let themeProp = obj.theme[prop];
            if (!Array.isArray(themeProp[0])) themeProp = [themeProp];

            const attributes = themeProp.reduce(
              (str, style) => [
                `${str[0]}${escape(style[0])}`,
                `${str[1]}${escape(style[1])}`,
              ],
              ["", ""]
            );

            return console[prop](
              `${attributes[0]}${symbolProp ? `${symbolProp} ` : ""}${
                obj.prefix ? `${obj.prefix} ` : ""
              }${args[0]}`,
              ...args.slice(1),
              attributes[1]
            );
          }
        : console[prop],
  }
);

export default proxiedConsole;
