// __tests__/css-arith.test.ts
import { createCssArith } from "../src";

// Create a mock DOM environment using jsdom
const { JSDOM } = require("jsdom");
const jsdom = new JSDOM("<!doctype html><html><body></body></html>", {
  pretendToBeVisual: true, // Enable visual mode to set dimensions
  beforeParse(window: any) {
    // Set the dimensions (e.g., 1920x1080)
    window.innerWidth = 1920;
    window.innerHeight = 1080;
  },
});
global.window = jsdom.window;

// Test for summing values correctly in different units
test("sum function adds values correctly in different units", () => {
  const cssArith = createCssArith({ round: false });
  const values = ["10px", "20px", "5rem", "10vh", "30%", "20em"];
  const result = cssArith.sum(values);
  // The sum of values in pixels should be 1114px
  expect(result).toBe("1114px");
});

// Test for rounding values correctly with different rounding options
test("sum function rounds values correctly with different rounding options", () => {
  const cssArith = createCssArith({ round: true, roundValue: 2 });
  const values = ["10.1234px", "20.5678px", "15.6789px"];
  const result = cssArith.sum(values);
  // The sum of values rounded to 2 decimal places should be 46.37px
  expect(result).toBe("46.37px");
});

// Test for handling negative values
test("sum function handles negative values", () => {
  const cssArith = createCssArith({ round: true });
  const values = ["10px", "-20px", "5rem", "-10vh"];
  const result = cssArith.sum(values);
  // The sum of values with negatives should be -38px
  expect(result).toBe("-38px");
});

// Test for handling output units other than px
test("sum function handles output units other than px", () => {
  const cssArith = createCssArith({ round: false, outputUnit: "rem" });
  const values = ["10px", "20px", "5rem", "10vh"];
  const result = cssArith.sum(values);
  // The sum of values in rem should be 13.625rem
  expect(result).toBe("13.625rem");
});

// Test for handling invalid input values
test("sum function handles invalid input values", () => {
  const cssArith = createCssArith({ round: false });
  const values = ["10px", "invalid", "5rem"];
  // Invalid input value should throw an error with a specific message
  expect(() => cssArith.sum(values)).toThrow("Invalid value: invalid");
});

// Test for handling unsupported units
test("sum function handles unsupported units", () => {
  const cssArith = createCssArith({ round: false });
  const values = ["10px", "20abc", "5rem"];
  // Unsupported unit in input should throw an error with a specific message
  expect(() => cssArith.sum(values)).toThrow("Unsupported unit: abc");
});
