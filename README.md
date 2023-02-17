# cnum

Comfortably Numbers (cnum) represents rational numbers and related mathematical expressions in a *bigint*eresting way.

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][build-image]][build-url]
[![Build Size][size-image]][size-url]
[![Code Coverage][coverage-image]][coverage-url]
[![Scrutinizer Code Quality][scrutinizer-image]][scrutinizer-url]
[![Language Grade][lgtm-image]][lgtm-url]
[![GPL 3.0][license-image]](LICENSE)

## Install

```bash
yarn add cnum
```

## Usage

### Build System

```typescript
import {Rat} from 'cnum'

// a = 71/7
const a = new Rat(71, 7)

// b = 35/113
const b = new Rat(35, 113)

// c = a⋅b
const c = a.mul(b)

c.toString() // 355/113
c.valueOf() // 3.1415929203539825
```

### Node

```js
const {Rat} = require('cnum')
const r = new Rat(7, 11)
r.profile
```

### Script Tags

```html
<script src="https://unpkg.com/cnum"></script>
<script>
const r = new cnum.Rat(4, 13)
console.log(r.profile)
</script>
```

### Command Line Interface

```shellscript
$ cnum "(5/7) + (2/3) ^ (5/9)"
42352677594770199369/28000000000000000000

$ cnum
cnum> 2/7
2/7 (≈0.28571428571428571429)
```

#### CLI in Browser

[RunKit](https://npm.runkit.com/cnum)

## Read the Docs

[Documentation](https://acerix.github.io/cnum/)

## CLI Commands

- `yarn install`: Install dependencies
- `yarn dev`: Run tests when source files are changed
- `yarn lint --fix`: Lint with ESLint
- `yarn test`: Run tests
- `yarn doc`: Build documentation
- `yarn build`: Production build
- `yarn prepublish`: Prepare for publishing
- `yarn publish`: Publish to npm

## Feedback

- Report bug and feature requests as [GitHub Issues](https://github.com/acerix/cnum/issues)

## Sponsorship

- [Sponsor cnum](https://github.com/sponsors/acerix)

[npm-image]: https://img.shields.io/npm/v/cnum.svg
[npm-url]: https://npmjs.org/package/cnum
[downloads-image]: https://img.shields.io/npm/dm/cnum.svg
[downloads-url]: https://npmjs.org/package/cnum
[build-image]: https://github.com/acerix/cnum/workflows/Test/badge.svg
[build-url]: https://github.com/acerix/cnum/actions?query=workflow%2ATest
[size-image]: https://badgen.net/bundlephobia/min/cnum
[size-url]: https://bundlephobia.com/result?p=cnum
[coverage-image]: https://scrutinizer-ci.com/g/acerix/cnum/badges/coverage.png?b=main
[coverage-url]: https://scrutinizer-ci.com/g/acerix/cnum/?branch=main
[scrutinizer-image]: https://scrutinizer-ci.com/g/acerix/cnum/badges/quality-score.png?b=main
[scrutinizer-url]: https://scrutinizer-ci.com/g/acerix/cnum/?branch=main
[lgtm-image]: https://img.shields.io/lgtm/alerts/g/acerix/cnum.svg
[lgtm-url]: https://lgtm.com/projects/g/acerix/cnum/
[license-image]: https://img.shields.io/npm/l/cnum.svg

