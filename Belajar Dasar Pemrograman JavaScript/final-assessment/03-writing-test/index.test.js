import { sum } from "./index.js";
import { test } from "node:test";
import assert from "node:assert";

test('should sum correctly', () => {
  // Arrange
  const operandA = 1;
  const operandB = 1;

  // Action
  const actualValue = sum(operandA, operandB);

  // Assert
  const expectedValue = 2;
  assert.equal(actualValue, expectedValue);
});