# Comfortably Numbers

[![npm version](https://badge.fury.io/js/cnum.svg)](https://badge.fury.io/js/cnum)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/cnum)
[![Build status](https://github.com/acerix/cnum/workflows/Test/badge.svg)](https://github.com/acerix/cnum/actions?query=workflow%3ATest)

Comfortably Numbers (cnum) represents rational numbers and related mathamatical expressions in a *bigint*eresting way.

## Example Usage

### Script Tags

```html
<script src="//unpkg.com/cnum"></script>
<script>document.write(new Rat())</script>
```

### Command Line Interface

#### Install

```bash
yarn add cnum
```

#### Usage

```typescript
const {Rat} = require('./node_modules/cnum/dist/esbuild/cli.js')

// a = 71 / 7
const a = new Rat(71, 7)

// b = 35 / 113
const b = new Rat(35, 113)

// c = a * b
const c = a.multiply(b)

c.toString() // 355/113
c.valueOf() // 3.1415929203539825
```

### CLI In Yo' Browser

[RunKit + cnum](https://npm.runkit.com/cnum)

## Read the Docs

[cnum Documentation](https://acerix.github.io/cnum/)

## CLI Commands

*   `yarn install`: Installs dependencies
*   `yarn dev`: Run a development server
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
