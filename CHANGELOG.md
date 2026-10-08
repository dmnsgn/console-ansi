# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

# [3.0.0](https://github.com/dmnsgn/console-ansi/compare/v2.0.1...v3.0.0) (2026-10-08)

### Bug Fixes

* ignore empty NO_COLOR as per no-color.org ([2f2e68e](https://github.com/dmnsgn/console-ansi/commit/2f2e68ed3e3018bb584defcf7cafe052c75d37db))
* keep falsy labels and default missing labels as native console ([656116a](https://github.com/dmnsgn/console-ansi/commit/656116a713e5f1569c7ee07092dc1a91a9090e53))
* merge theme, levels and symbol options with defaults ([f42e3c7](https://github.com/dmnsgn/console-ansi/commit/f42e3c7fe158fcf117d0dc0d168d0764830ac37b))
* support format specifiers and remove trailing space ([ede7c5f](https://github.com/dmnsgn/console-ansi/commit/ede7c5fdb82f14f483f57f63f6e16965a2ef9248))

### Features

* add debug and trace levels ([bb5c455](https://github.com/dmnsgn/console-ansi/commit/bb5c4553c2813be16873e326faeae00a52342a4a))
* add timestamps option ([f737821](https://github.com/dmnsgn/console-ansi/commit/f737821979effd4f6cdea4ddedd2639a73cddd33))
* freeze styles + dim debug and count ([170049a](https://github.com/dmnsgn/console-ansi/commit/170049afcc7780bc3895f2bca30eb670214ca020))
* share labelled methods theme and symbol + add assert, groupCollapsed and default symbols ([9c26541](https://github.com/dmnsgn/console-ansi/commit/9c2654118371b661a4745aa1ed9de532141f0a34))
* style non-Chromium browsers console with CSS ([23893bb](https://github.com/dmnsgn/console-ansi/commit/23893bb741709d154f990dc16066799e9f2fbf7b))

### BREAKING CHANGES

* default level is now "debug" so debug and trace show by default
* theme.countReset/timeLog/timeEnd no longer read

## [2.0.1](https://github.com/dmnsgn/console-ansi/compare/v2.0.0...v2.0.1) (2024-07-06)



# [2.0.0](https://github.com/dmnsgn/console-ansi/compare/v1.3.0...v2.0.0) (2023-07-27)


### Features

* add getConsole + expose noColor as an option ([cc57f77](https://github.com/dmnsgn/console-ansi/commit/cc57f773ed1c9d5da8d3ebe57807697f27fd7e93))


### BREAKING CHANGES

* change exports and update engines



# [1.3.0](https://github.com/dmnsgn/console-ansi/compare/v1.2.0...v1.3.0) (2022-06-14)


### Bug Fixes

* remove end sequence in browser ([d575954](https://github.com/dmnsgn/console-ansi/commit/d575954f3e7f5041bc9a459b8b198da02112e1e9))


### Features

* add support for NO_COLOR ([14024c1](https://github.com/dmnsgn/console-ansi/commit/14024c12735b2a09c8eaaf42a5f8f4fe18d48469))



# [1.2.0](https://github.com/dmnsgn/console-ansi/compare/v1.1.2...v1.2.0) (2021-09-10)


### Features

* add exports field to package.json ([0839010](https://github.com/dmnsgn/console-ansi/commit/0839010cb29a2c26b9f5dede91911c5ad0c10954))



## [1.1.2](https://github.com/dmnsgn/console-ansi/compare/v1.1.1...v1.1.2) (2021-04-14)


### Bug Fixes

* move exported object definition in types ([b0f810e](https://github.com/dmnsgn/console-ansi/commit/b0f810ef7546ce05e4bd265df73e2e3fcc9fa0f9))



## [1.1.1](https://github.com/dmnsgn/console-ansi/compare/v1.1.0...v1.1.1) (2021-04-14)


### Bug Fixes

* export types ([97d331a](https://github.com/dmnsgn/console-ansi/commit/97d331a74ef214bcbb688e73287026217a7d8d15))



# [1.1.0](https://github.com/dmnsgn/console-ansi/compare/v1.0.4...v1.1.0) (2021-03-24)


### Features

* add log level ([0d79239](https://github.com/dmnsgn/console-ansi/commit/0d79239a955a89bb02f549d80a3f50145fa4de2b))



## [1.0.4](https://github.com/dmnsgn/console-ansi/compare/v1.0.3...v1.0.4) (2021-03-24)


### Bug Fixes

* only stringify labelled arguments ([834ef3b](https://github.com/dmnsgn/console-ansi/commit/834ef3b3549ecdc09f3fb08666affe1a4704d6be))



## [1.0.3](https://github.com/dmnsgn/console-ansi/compare/v1.0.2...v1.0.3) (2021-03-23)



## [1.0.2](https://github.com/dmnsgn/console-ansi/compare/v1.0.1...v1.0.2) (2021-03-23)


### Bug Fixes

* screenshot ([f858234](https://github.com/dmnsgn/console-ansi/commit/f858234f55dfb1e140a8a754450a3d5871a09e2a))



## [1.0.1](https://github.com/dmnsgn/console-ansi/compare/v1.0.0...v1.0.1) (2021-03-23)


### Bug Fixes

* screenshot ([3fec530](https://github.com/dmnsgn/console-ansi/commit/3fec5307f5536562bba35f44e6895916b8df381e))



# 1.0.0 (2021-03-23)
