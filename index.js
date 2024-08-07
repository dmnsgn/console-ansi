/** @module console-ansi */

import styles from "./styles.js";

const isNode = typeof process !== "undefined";
const { env = {}, argv = [] } = isNode ? process : {};

/**
 * Check for the presence of a NO_COLOR environment variable that prevents the addition of ANSI color.

 * @private
 * @see [no-color.org]{@link https://no-color.org/}
 */
const noColor =
  "NO_COLOR" in env ||
  ["--no-color", "--color=false"].some((arg) => argv.includes(arg));

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

const getConsole = (options) =>
  new Proxy(
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
      noColor,
      ...options,
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

                  let themeProp = obj.noColor
                    ? []
                    : !Array.isArray(obj.theme[prop][0])
                      ? [obj.theme[prop]]
                      : obj.theme[prop];

                  const attributes = themeProp.reduce(
                    (str, style) => [
                      `${str[0]}${escape(style[0])}`,
                      `${str[1]}${isNode ? escape(style[1]) : ""}`,
                    ],
                    ["", ""],
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
                    attributes[1],
                  );
                }
              : console[prop]
            : () => {},
    },
  );

export {
  /**
   * Get an instance of the Proxy-ed console. Useful if you need different prefixes for instance.
   * @function
   * @param {import("./types.js").ConsoleAnsi} options
   * @returns {import("./types.js").ConsoleAnsi}
   */
  getConsole,
  /**
   * Basic ANSI escape codes map
   * @type {import("./types.js").ConsoleAnsiTheme}
   * @see [Wikipedia ANSI]{@link https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters}
   * @see [Node.js util]{@link https://nodejs.org/api/util.html#util_customizing_util_inspect_colors}
   */
  styles,
};

/**
 * Export a Proxy object to automatically style the console with ANSI strings.
 *
 * @type {import("./types.js").ConsoleAnsi}
 */
export default getConsole();

export * from "./types.js";
