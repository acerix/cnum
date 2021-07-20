# Comfortably Numbers

[![Build status](https://github.com/acerix/cnum/workflows/Test/badge.svg)](https://github.com/acerix/cnum/actions?query=workflow%3ATest)

Comfortably Numbers (cnum) represents rational numbers and related mathamatical expressions in a *bigint*eresting way.

## Install

```bash
yarn add cnum
```

## Example Usage

```typescript
import Rat from 'cnum/Rat'

const a = new Rat(71, 7) // a = 71/7
const b = new Rat(5, 791) // b = 5/791
const c = a.multiply(b) // c = a*b

c.toString() // 355/113
c.valueOf() // 3.14159292035
```

## Read the Docs

[cnum documentation](https://acerix.github.io/cnum/)

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
