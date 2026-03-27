import sum from "./index.js";
import { test } from "node:test";
import assert from "node:assert";

test("first argument not typeof number", () => {
  const operandA = "num";
  const operandB = 1;

  const actualValue = sum(operandA, operandB);

  const expectedValue = 0;
  assert.equal(actualValue, expectedValue);
});

test("second argument not typeof number", () => {
  const operandA = 1;
  const operandB = "num";

  const actualValue = sum(operandA, operandB);

  const expectedValue = 0;
  assert.equal(actualValue, expectedValue);
});

test("first argument is negative", () => {
  const operandA = -1;
  const operandB = 1;

  const actualValue = sum(operandA, operandB);

  const expectedValue = 0;
  assert.equal(actualValue, expectedValue);
});

test("second argument is negative", () => {
  const operandA = -1;
  const operandB = 0;

  const actualValue = sum(operandA, operandB);

  const expectedValue = 0;
  assert.equal(actualValue, expectedValue);
});

test("should sum correctly", () => {
  // Arrange
  const operandA = 1;
  const operandB = 1;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  const expectedValue = 2;
  assert.equal(actualValue, expectedValue);
});
