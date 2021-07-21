# cnum - Comfortably Numbers

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][build-image]][build-url]
[![GPL 3.0][license-image]](LICENSE)

Comfortably Numbers (cnum) represents rational numbers and related mathamatical expressions in a *bigint*eresting way.

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
const c = a.multiply(b)

c.toString() // 355/113
c.valueOf() // 3.1415929203539825
```

### Command Line Interface

```typescript
// const {Rat} = require('./node_modules/cnum/dist/esbuild/cli.js')
const {Rat} = require('cnum')
new Rat(4, 13)
```

#### In Your Browser

[Try with RunKit](https://npm.runkit.com/cnum)

### Script Tags

```html
<script src="//unpkg.com/cnum"></script>
```

```js
const r = new Rat(4, 13)
document.write(r)
```

[CodePen Demo](https://codepen.io/acerix/pen/GRmvmYL)

## Read the Docs

[cnum Documentation](https://acerix.github.io/cnum/)

## CLI Commands

*   `yarn install`: Install dependencies
*   `yarn dev`: Run tests when source files are changed
*   `yarn cli`: Start a command line interface
*   `yarn lint`: Lint with ESLint
*   `yarn test`: Run Jest and Enzyme tests
*   `yarn clean`: Delete previous build
*   `yarn docs`: Build documentation
*   `yarn build`: Production build
*   `yarn build-all`: Production build all the things
*   `yarn predeploy`: Prepare for publishing
*   `yarn publish`: Publish to npm

## Feedback

* Please report bug and feature requests as [GitHub Issues](https://github.com/acerix/cnum/issues)

[npm-image]: https://img.shields.io/npm/v/cnum.svg
[npm-url]: https://npmjs.org/package/cnum
[downloads-image]: https://img.shields.io/npm/dm/cnum.svg
[downloads-url]: https://npmjs.org/package/cnum
[build-image]: https://github.com/acerix/cnum/workflows/Test/badge.svg
[build-url]: https://github.com/acerix/cnum/actions?query=workflow%3ATest
[license-image]: https://img.shields.io/npm/l/cnum.svg
