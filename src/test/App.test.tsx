import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  it("renders header", () => {
    render(<App />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("renders main content area", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(<App />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders header with title", () => {
    render(<App />);
    expect(screen.getByText("7 Wonder duel scorepad")).toBeInTheDocument();
  });

  it("has main with App class", () => {
    render(<App />);
    expect(screen.getByRole("main")).toHaveClass("App");
  });
});
