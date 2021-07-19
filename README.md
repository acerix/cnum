# Comfortably Numbers

[![Build Status](https://github.com/acerix/cnum/workflows/Test/badge.svg)](https://github.com/acerix/cnum/actions?query=workflow%3ATest)

Comfortably Numbers (cnum) represents rational numbers in a biginteresting way.

## Install

```bash
yarn add cnum
```

## Example Usage

```typescript
import { rat } from './main'

console.log( new rat(1,3).add(new rat(5,7)) )
```

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
*   `yarn build-all`: Production-ready clean build of all the things
*   `yarn publish`: Publish to npm

## Feedback

* Please report bug and feature requests as [GitHub Issues](https://github.com/acerix/cnum/issues)
