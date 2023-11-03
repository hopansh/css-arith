# css-arith

"css-arith" is a TypeScript library that simplifies performing arithmetic operations on values with different CSS units (e.g., px, rem, em, vh, vw, %). It offers flexibility to customize the output unit, round values, and configure the base font size for "rem" and "em" conversions.

## Installation

You can install "css-arith" via npm:

```bash
npm install css-arith
```

# Usage
## Basic Usage
To use the "css-arith" library, you can create an instance with custom configuration and use the sum function to perform arithmetic operations:

```typescript
import { createCssArith } from 'css-arith';

// Create an instance with custom configuration
const cssArith = createCssArith({
round: true, // Whether to round the result
baseFontSize: 16, // Base font size for rem and em unit conversions (default is 16)
roundValue: 4, // Decimal places to round to (default is 4)
outputUnit: 'px' // Desired output unit (default is 'px')
});

// Perform a sum operation
const result = cssArith.sum(['12px', '20vh', '2rem']);

console.log(result); // '19.5px'
```

## Configuration Options
You can customize the library's behavior with the following configuration options:

```typescript

- `round` (boolean): Whether to round the result. Default is `true`.
- `baseFontSize` (number): Base font size for rem and em unit conversions. Default is `16`.
- `roundValue` (number): Decimal places to round to. Default is `4`.
- `outputUnit` (string): Desired output unit. Default is `'px'`.
```
## Supported Units
The "css-arith" library supports the following units for input and output:

```typescript
- `px` (pixels)
- `rem` (root em)
- `em` (em)
- `vh` (viewport height)
- `vw` (viewport width)
- `%` (percentage)
```

# License
  This library is licensed under the MIT License - see the [LICENSE](https://github.com/hopansh/css-arith/blob/main/LICENSE) file for details.
