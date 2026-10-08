/** @module console-ansi */

import styles from "./styles.js";

const isNode = typeof process !== "undefined";
const { env = {}, argv = [] } = isNode ? process : {};

/**
 * Disable ANSI color when NO_COLOR is set and non-empty.
 *
 * @private
 * @see [no-color.org]{@link https://no-color.org/}
 */
const noColor =
  Boolean(env.NO_COLOR) ||
  ["--no-color", "--color=false"].some((arg) => argv.includes(arg));

/**
 * Escape number for ANSI sequence
 *
 * @private
 * @param {number} n
 * @returns {string}
 */
const escape = (n) => `\u{1B}[${n}m`;

/**
 * Console methods that require special formatting, mapped to the method owning
 * their symbol and theme: the label is the counter/timer key so it must match
 * across calls.
 *
 * @private
 */
const labelled = new Map([
  ["time", "time"],
  ["timeLog", "time"],
  ["timeEnd", "time"],
  ["count", "count"],
  ["countReset", "count"],
]);

const getStyleKey = (prop) => labelled.get(prop) ?? prop;

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
        assert: styles.red,

        count: styles.white,
        group: styles.gray,
        groupCollapsed: styles.gray,
        groupEnd: styles.gray,
        time: styles.cyan,

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
        // debug: "◆",
        log: "✔",
        info: "ℹ",
        warn: "⚠",
        error: "✖",
        // trace: "↳",
        assert: "✘",
        count: "#",
        group: "▼",
        groupCollapsed: "►",
        time: "◷",
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
            ? Object.keys(obj.theme).includes(getStyleKey(prop))
              ? (...args) => {
                  const styleKey = getStyleKey(prop);
                  const symbolProp = obj.symbol[styleKey];

                  let themeProp = obj.noColor
                    ? []
                    : Array.isArray(obj.theme[styleKey][0])
                      ? obj.theme[styleKey]
                      : [obj.theme[styleKey]];

                  const attributes = themeProp.reduce(
                    (str, style) => [
                      `${str[0]}${escape(style[0])}`,
                      `${str[1]}${isNode ? escape(style[1]) : ""}`,
                    ],
                    ["", ""],
                  );

                  const isLabelled = labelled.has(prop);
                  const condition = prop === "assert" ? [args.shift()] : [];

                  return console[prop](
                    ...condition,
                    `${attributes[0]}${[
                      symbolProp,
                      obj.prefix,
                      isLabelled && args[0],
                    ]
                      .filter(Boolean)
                      .join(" ")}${isLabelled ? attributes[1] : ""}`,
                    ...(args.slice(isLabelled ? 1 : 0) || []),
                    ...(isLabelled ? [] : [attributes[1]]),
                  );
                }
              : console[prop]
            : () => {},
    },
  );

export {
  /**
   * Get an instance of the Proxy-ed console. Useful if you need different
   * prefixes for instance.
   *
   * @function
   * @param {import("./types.js").ConsoleAnsi} options
   * @returns {import("./types.js").ConsoleAnsi}
   */
  getConsole,
  /**
   * Basic ANSI escape codes map
   *
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
