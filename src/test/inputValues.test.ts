import { describe, it, expect } from "vitest";
import { inputsToValues, calculateTotal } from "../data/inputValues";
import {
  initialInputs,
  agoraInputs,
  pantheonInputs,
} from "../data/inputValues";

describe("inputValues utilities", () => {
  describe("inputsToValues", () => {
    it("converts empty array to empty object", () => {
      const result = inputsToValues([]);
      expect(result).toEqual({});
    });

    it("converts single input to object", () => {
      const inputs = [
        { id: "test", value: "5", label: "Test", image: "", placeholder: "" },
      ];
      const result = inputsToValues(inputs);
      expect(result).toEqual({ test: "5" });
    });

    it("converts multiple inputs to object", () => {
      const inputs = [
        { id: "a", value: "1", label: "A", image: "", placeholder: "" },
        { id: "b", value: "2", label: "B", image: "", placeholder: "" },
      ];
      const result = inputsToValues(inputs);
      expect(result).toEqual({ a: "1", b: "2" });
    });

    it("converts inputs with empty value to empty string", () => {
      const inputs = [
        { id: "test", value: "", label: "Test", image: "", placeholder: "" },
      ];
      const result = inputsToValues(inputs);
      expect(result).toEqual({ test: "" });
    });

    it("converts inputs with undefined value to empty string", () => {
      const inputs = [
        {
          id: "test",
          value: undefined as unknown as string,
          label: "Test",
          image: "",
          placeholder: "",
        },
      ];
      const result = inputsToValues(inputs);
      expect(result).toEqual({ test: "" });
    });
  });

  describe("calculateTotal", () => {
    it("returns 0 for empty values", () => {
      const values: { [id: string]: string } = {};
      const result = calculateTotal(values, []);
      expect(result).toEqual(0);
    });

    it("returns 0 for empty inputs array", () => {
      const values = { test: "5" };
      const result = calculateTotal(values, []);
      expect(result).toEqual(0);
    });

    it("calculates total from single value", () => {
      const inputs = [
        { id: "coins", value: "", label: "Coins", image: "", placeholder: "" },
      ];
      const values = { coins: "10" };
      const result = calculateTotal(values, inputs);
      expect(result).toEqual(10);
    });

    it("calculates total from multiple values", () => {
      const inputs = [
        { id: "a", value: "", label: "A", image: "", placeholder: "" },
        { id: "b", value: "", label: "B", image: "", placeholder: "" },
      ];
      const values = { a: "5", b: "3" };
      const result = calculateTotal(values, inputs);
      expect(result).toEqual(8);
    });

    it("handles missing values as 0", () => {
      const inputs = [
        { id: "a", value: "", label: "A", image: "", placeholder: "" },
        { id: "b", value: "", label: "B", image: "", placeholder: "" },
      ];
      const values = { a: "5" };
      const result = calculateTotal(values, inputs);
      expect(result).toEqual(5);
    });

    it("handles decimal values", () => {
      const inputs = [
        { id: "test", value: "", label: "Test", image: "", placeholder: "" },
      ];
      const values = { test: "2.5" };
      const result = calculateTotal(values, inputs);
      expect(result).toEqual(2.5);
    });

    it("handles invalid strings as 0", () => {
      const inputs = [
        { id: "test", value: "", label: "Test", image: "", placeholder: "" },
      ];
      const values = { test: "abc" };
      const result = calculateTotal(values, inputs);
      expect(result).toEqual(0);
    });
  });

  describe("data integrity", () => {
    it("initialInputs has correct structure", () => {
      expect(initialInputs.length).toBeGreaterThan(0);
      initialInputs.forEach((input) => {
        expect(input).toHaveProperty("id");
        expect(input).toHaveProperty("label");
        expect(input).toHaveProperty("value");
        expect(input).toHaveProperty("image");
        expect(input).toHaveProperty("placeholder");
      });
    });

    it("agoraInputs has correct structure", () => {
      agoraInputs.forEach((input) => {
        expect(input).toHaveProperty("id");
        expect(input).toHaveProperty("label");
      });
    });

    it("pantheonInputs has correct structure", () => {
      pantheonInputs.forEach((input) => {
        expect(input).toHaveProperty("id");
        expect(input).toHaveProperty("label");
      });
    });

    it("all input IDs are unique", () => {
      const allIds = [...initialInputs, ...agoraInputs, ...pantheonInputs].map(
        (i) => i.id,
      );
      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });
  });
});
