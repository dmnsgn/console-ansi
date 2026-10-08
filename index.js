/** @module console-ansi */

import { palettes, styles } from "./styles.js";

const isNode = typeof globalThis.process?.versions?.node === "string";
const { env = {}, argv = [] } = isNode ? process : {};

const supportsAnsi =
  isNode || /\bChrom(e|ium)\//.test(globalThis.navigator?.userAgent);

/**
 * Disable color when NO_COLOR is set and non-empty.
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

const timeFormat = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  fractionalSecondDigits: 3,
  hourCycle: "h23",
});

const isEnabled = ({ levels, level }, method) =>
  !Object.hasOwn(levels, method) ||
  (levels[level] || 0) <= (levels[method] || 0);

const getAttributes = ({ theme, noColor }, key) => {
  if (noColor) return [];

  const style = theme[key];
  return Array.isArray(style[0]) ? style : [style];
};

const format = (segments, isLabelled) => {
  if (supportsAnsi) {
    return [
      segments
        .map(([text, attributes], i) => {
          const [open, close] = [0, 1].map((j) =>
            attributes.map((attribute) => toAnsi(attribute[j])).join(""),
          );
          const isClosed = isNode || i < segments.length - 1;
          return `${open}${text}${isClosed ? close : ""}`;
        })
        .join(" "),
    ];
  }

  const texts = segments.map(([text]) => text);
  const css = segments.map(([, attributes]) =>
    attributes
      .map(([, , declaration]) => declaration)
      .filter(Boolean)
      .join("; "),
  );

  // %c would be part of the native label key
  return isLabelled || !css.some(Boolean)
    ? [texts.join(" ")]
    : [texts.map((text) => `%c${text}`).join(" "), ...css];
};

const write = (obj, method, args) => {
  const key = labelled.get(method) ?? method;
  if (!Object.hasOwn(obj.theme, key)) return console[method](...args);

  const isLabelled = labelled.has(method);
  const condition = method === "assert" ? [args.shift()] : [];
  // Merge into the first string to keep its format specifiers
  const text = isLabelled
    ? String(args.shift() ?? "default")
    : typeof args[0] === "string"
      ? args.shift()
      : "";
  const head = [obj.symbol[key], obj.prefix, text].filter(Boolean).join(" ");

  const segments = [];
  if (obj.timestamps && !isLabelled) {
    segments.push([timeFormat.format(), getAttributes(obj, "timestamps")]);
  }
  if (head || isLabelled) segments.push([head, getAttributes(obj, key)]);

  return console[method](
    ...condition,
    ...(segments.length ? format(segments, isLabelled) : []),
    ...args,
  );
};

const getConsole = ({ theme, levels, symbol, ...options } = {}) => {
  const methods = new Map();

  return new Proxy(
    {
      prefix: "",
      level: "debug",
      timestamps: false,
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

        timestamps: styles.dim,

        // Not supported, they already have some coloring
        // dir: // use second argument { colors: true }
        // table:
        ...theme,
      },
      levels: {
        error: 5,
        warn: 4,
        info: 3,
        log: 2,
        debug: 1,
        trace: 1,
        ...levels,
      },
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
  /**
   * Chrome DevTools ANSI color palettes used for CSS styling in browsers
   *
   * @type {import("./types.js").ConsoleAnsiPalettes}
   * @see [Chrome DevTools]{@link https://developer.chrome.com/docs/devtools/console/format-style}
   */
  palettes,
};

/**
 * Export a Proxy object to automatically style the console with ANSI strings in
 * Node.js and CSS in browsers.
 *
 * @type {import("./types.js").ConsoleAnsi}
 */
export default getConsole();

export * from "./types.js";
