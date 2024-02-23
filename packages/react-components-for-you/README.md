# react-components-for-you

## Overview

A [React](https://reactjs.org/) component library showcased with [Storybook](https://storybook.js.org/).

## See the components [here](https://react-components-storybook-lv.netlify.app/)

**This is a WIP**.

## Installation

To install the package, run:

```shell
yarn add @liene-putnina/react-components-for-you
```

You also need to install the following **peer dependencies:**

```shell
react react-dom
```

## Usage

Import either the whole library or specific components

```jsx
// Imports the whole library
import * from '@liene-putnina/react-components-for-you'; 

// Imports a single component
import { Button } from '@liene-putnina/react-components-for-you';
```

Add them to your code

```tsx
// The component without variants
const MyComponent = () => {
  return (
    <Button>{children}<Button/>
  )
};

// The component with variants
 const MyComponent = () => {
    return (
      <Button variant={ButtonVariant.DANGER}>{children}<Button/>
    )
  };
```

Due to the structure of this library, the css of the components is **not included by default**. In order to get the styling working, add **the following line** to your global style file:

```css
@import '@liene-putnina/react-components-for-you/dist/index.css';
```

## Development

Uses node version **16.x.x**

### To run locally

```shell
# Opens the storybook dev server on `http://localhost:6006/`
yarn storybook
```

### To build

```shell
# Builds the library
yarn build

# Builds the static storybook page
yarn build-storybook
```

## License

Licensed under **MIT** License.
