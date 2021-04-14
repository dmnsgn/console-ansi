# console-ansi

[![npm version](https://img.shields.io/npm/v/console-ansi)](https://www.npmjs.com/package/console-ansi)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/console-ansi)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/console-ansi)](https://www.npmjs.com/package/console-ansi)
[![dependencies](https://img.shields.io/david/dmnsgn/console-ansi)](https://github.com/dmnsgn/console-ansi/blob/main/package.json)
[![types](https://img.shields.io/npm/types/console-ansi)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/console-ansi)](https://github.com/dmnsgn/console-ansi/blob/main/LICENSE.md)

Easy console coloring and prefixing via Proxy object with ANSI strings.

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/console-ansi/main/screenshot.jpg)

## Installation

```bash
npm install console-ansi
```

## Usage

```js
import console from "console-ansi";
import styles from "console-ansi/styles.js";

// Set prefix
console.prefix = "[test]";

// Call the console object methods as usual
console.time("Test time");
console.log("Test log");
console.info("Test info");
console.warn("Test warn");
console.error("Test error");
console.timeEnd("Test time");

// Customise color
console.theme.log = styles.blue;
console.log("Test log blue");

// Remove symbols
console.symbol = {};
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_consoleAnsi">consoleAnsi</a></dt>
<dd></dd>
<dt><a href="#module_consoleAnsiStyles">consoleAnsiStyles</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ConsoleAnsi">ConsoleAnsi</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ConsoleAnsiThemeAttributeArray">ConsoleAnsiThemeAttributeArray</a> : <code>Array.&lt;number&gt;</code></dt>
<dd><p>Array for ANSI definition [start, end].</p>
</dd>
<dt><a href="#ConsoleAnsiTheme">ConsoleAnsiTheme</a> : <code>Object.&lt;string, ConsoleAnsiThemeAttributeArray&gt;</code> | <code>Object.&lt;string, Array.&lt;ConsoleAnsiThemeAttributeArray&gt;&gt;</code></dt>
<dd><p>Theme object consisting of ANSI styles or Array of ANSI styles.</p>
</dd>
<dt><a href="#ConsoleAnsiLevel">ConsoleAnsiLevel</a> : <code>string</code></dt>
<dd><p>Current log level. Can be any console method but levels property only defines log(1)/info(2)/warn(3)/error(4).</p>
</dd>
<dt><a href="#ConsoleAnsiLevels">ConsoleAnsiLevels</a> : <code>Object.&lt;ConsoleAnsiLevel, number&gt;</code></dt>
<dd><p>Levels object consisting of console method as keys and numbered priority.</p>
</dd>
<dt><a href="#ConsoleAnsiSymbol">ConsoleAnsiSymbol</a> : <code>Object.&lt;string, string&gt;</code></dt>
<dd><p>Map of unicode symbols to be prepended to certain console methods.</p>
</dd>
</dl>

<a name="module_consoleAnsi"></a>

## consoleAnsi

<a name="exp_module_consoleAnsi--proxiedConsole"></a>

### proxiedConsole : [<code>ConsoleAnsi</code>](#ConsoleAnsi) ⏏

Export a Proxy object to automatically style the console with ANSI strings.

**Kind**: Exported constant  
<a name="module_consoleAnsiStyles"></a>

## consoleAnsiStyles

<a name="exp_module_consoleAnsiStyles--styles"></a>

### styles : <code>Object.&lt;string, ConsoleAnsiThemeAttributeArray&gt;</code> ⏏

**Kind**: Exported constant  
**See**

- [Wikipedia ANSI](<https://en.wikipedia.org/wiki/ANSI_escape_code#SGR_(Select_Graphic_Rendition)_parameters>)
- [Node.js util](https://nodejs.org/api/util.html#util_customizing_util_inspect_colors)

<a name="ConsoleAnsi"></a>

## ConsoleAnsi : <code>Object</code>

**Kind**: global typedef  
**Properties**

| Name     | Type                                                 | Default                                                                                             | Description                                                                        |
| -------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [prefix] | <code>string</code>                                  | <code>&quot;&#x60;&#x60;&quot;</code>                                                               | A string to prepend to every log.                                                  |
| [theme]  | [<code>ConsoleAnsiTheme</code>](#ConsoleAnsiTheme)   |                                                                                                     | Color definition associated to console methods.                                    |
| [level]  | [<code>ConsoleAnsiLevel</code>](#ConsoleAnsiLevel)   | <code>&quot;log&quot;</code>                                                                        | A minimum log level value. See ConsoleAnsiLevels.                                  |
| [levels] | [<code>ConsoleAnsiLevels</code>](#ConsoleAnsiLevels) | <code>{ error: 5, warn: 4, info: 3, log: 2 }</code>                                                 | Numbered priority associated to console methods to match above for level property. |
| [symbol] | [<code>ConsoleAnsiSymbol</code>](#ConsoleAnsiSymbol) | <code>{ log: &quot;✔&quot;, info: &quot;ℹ&quot;, warn: &quot;⚠&quot;, error: &quot;✖&quot; }</code> | Unicode symbols to prepend to defined console methods.                             |

<a name="ConsoleAnsiThemeAttributeArray"></a>

## ConsoleAnsiThemeAttributeArray : <code>Array.&lt;number&gt;</code>

Array for ANSI definition [start, end].

**Kind**: global typedef  
<a name="ConsoleAnsiTheme"></a>

## ConsoleAnsiTheme : <code>Object.&lt;string, ConsoleAnsiThemeAttributeArray&gt;</code> \| <code>Object.&lt;string, Array.&lt;ConsoleAnsiThemeAttributeArray&gt;&gt;</code>

Theme object consisting of ANSI styles or Array of ANSI styles.

**Kind**: global typedef  
<a name="ConsoleAnsiLevel"></a>

## ConsoleAnsiLevel : <code>string</code>

Current log level. Can be any console method but levels property only defines log(1)/info(2)/warn(3)/error(4).

**Kind**: global typedef  
<a name="ConsoleAnsiLevels"></a>

## ConsoleAnsiLevels : <code>Object.&lt;ConsoleAnsiLevel, number&gt;</code>

Levels object consisting of console method as keys and numbered priority.

**Kind**: global typedef  
<a name="ConsoleAnsiSymbol"></a>

## ConsoleAnsiSymbol : <code>Object.&lt;string, string&gt;</code>

Map of unicode symbols to be prepended to certain console methods.

**Kind**: global typedef

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/console-ansi/blob/main/LICENSE.md).
