import { describe, it, expect } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "./testUtils";
import { SWDheader } from "../components/SWDheader/SWDheader";

describe("SWDheader", () => {
  it("renders with default title", () => {
    render(<SWDheader />);
    expect(screen.getByText("7 Wonder duel scorepad")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    render(<SWDheader title="Custom Title" />);
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
  });

  it("renders h1 element", () => {
    render(<SWDheader />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders header element", () => {
    render(<SWDheader />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("closes menu when clicking outside", async () => {
    render(<SWDheader />);
    const menuButton = screen.getByLabelText("Menu");

    fireEvent.click(menuButton);
    expect(screen.getByText("Expansions:")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("Expansions:")).not.toBeInTheDocument();
  });
});
