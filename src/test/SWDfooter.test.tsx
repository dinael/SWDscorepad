import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SWDfooter } from "../components/SWDfooter/SWDfooter";

describe("SWDfooter", () => {
  it("renders footer element", () => {
    render(<SWDfooter />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<SWDfooter title="Custom Footer Text" />);
    expect(screen.getByText("Custom Footer Text")).toBeInTheDocument();
  });

  it("contains paragraph element", () => {
    render(<SWDfooter />);
    const footer = screen.getByRole("contentinfo");
    expect(footer.querySelector("p")).toBeInTheDocument();
  });

  it("renders copyright with default values", () => {
    render(<SWDfooter />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(`${currentYear} SWDscorepad All rights reserved\\.`),
      ),
    ).toBeInTheDocument();
  });

  it("renders copyright with custom name", () => {
    render(<SWDfooter name="Custom App" />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(`${currentYear} Custom App All rights reserved\\.`),
      ),
    ).toBeInTheDocument();
  });

  it("renders copyright with custom text", () => {
    render(<SWDfooter text="Some rights reserved" />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        new RegExp(`${currentYear} SWDscorepad Some rights reserved\\.`),
      ),
    ).toBeInTheDocument();
  });

  it("renders copyright with custom symbol", () => {
    render(<SWDfooter symbol="©" />);
    expect(screen.getByText(/©/)).toBeInTheDocument();
  });

  it("renders without symbol when not provided", () => {
    render(<SWDfooter symbol="" />);
    expect(screen.queryByText("©")).not.toBeInTheDocument();
  });

  it("applies loading class when loading is true", () => {
    render(<SWDfooter loading />);
    const footer = screen.getByRole("contentinfo");
    const copyright = footer.querySelector("p");
    expect(copyright?.className).toMatch(/is-loading/);
  });
});
