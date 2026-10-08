/** @module console-ansi */

import styles from "./styles.js";

const isNode = typeof globalThis.process?.versions?.node === "string";
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
const toAnsi = (n) => `\u{1B}[${n}m`;

/**
 * Labelled methods mapped to the method owning their theme and symbol.
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

const isEnabled = ({ levels, level }, method) =>
  !Object.hasOwn(levels, method) ||
  (levels[level] || 0) <= (levels[method] || 0);

const getAttributes = ({ theme, noColor }, key) => {
  if (noColor) return ["", ""];

  const style = theme[key];
  return (Array.isArray(style[0]) ? style : [style]).reduce(
    ([open, close], [start, end]) => [
      `${open}${toAnsi(start)}`,
      isNode ? `${close}${toAnsi(end)}` : "",
    ],
    ["", ""],
  );
};

const write = (obj, method, args) => {
  const key = labelled.get(method) ?? method;
  if (!Object.hasOwn(obj.theme, key)) return console[method](...args);

  const [open, close] = getAttributes(obj, key);
  const isLabelled = labelled.has(method);
  const condition = method === "assert" ? [args.shift()] : [];
  const head = [obj.symbol[key], obj.prefix, isLabelled && args[0]]
    .filter(Boolean)
    .join(" ");

  return console[method](
    ...condition,
    `${open}${head}${isLabelled ? close : ""}`,
    ...args.slice(isLabelled ? 1 : 0),
    ...(isLabelled ? [] : [close]),
  );
};

const getConsole = ({ theme, levels, symbol, ...options } = {}) => {
  const methods = new Map();

  return new Proxy(
    {
      prefix: "",
      level: "log",
      noColor,
      ...options,
      theme: {
        debug: styles.dim,
        log: styles.green,
        info: styles.blue,
        warn: styles.yellow,
        error: styles.red,
        trace: styles.blue,
        assert: styles.red,

        count: styles.dim,
        group: styles.gray,
        groupCollapsed: styles.gray,
        groupEnd: styles.gray,
        time: styles.cyan,

        // Not supported, they already have some coloring
        // dir: // use second argument { colors: true }
        // table:
        ...theme,
      },
      levels: { error: 5, warn: 4, info: 3, log: 2, ...levels },
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
        ...symbol,
      },
    },
    {
      get(obj, prop) {
        if (prop in obj) return obj[prop];
        if (typeof console[prop] !== "function") return console[prop];

        if (!methods.has(prop)) {
          methods.set(prop, (...args) =>
            isEnabled(obj, prop) ? write(obj, prop, args) : undefined,
          );
        }
        return methods.get(prop);
      },
    },
  );
};

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
