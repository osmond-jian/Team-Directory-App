import { describe, it, expect } from "vitest";
import { button } from "../button.tsx";

const element = button;

describe("Button should render and work", () => {
  it("should render and display the button title, 'search'", () => {
    expect.element(element).toHaveTextContent('Search');
  });
    it("should do a function when clicked", () => {
    expect(add(1, 2)).toBe(3);
  });
});
