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
});
