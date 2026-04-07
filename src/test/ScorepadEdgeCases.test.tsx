import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { render } from "./testUtils";
import { Scorepad } from "../view/scorepad/Scorepad";
import { fireEvent } from "@testing-library/react";

vi.mock("../context/GameContext", async () => {
  const actual = await vi.importActual("../context/GameContext");
  return {
    ...actual,
    useGame: () => ({
      showAgora: true,
      showPantheon: false,
      toggleAgora: () => {},
      togglePantheon: () => {},
      language: "en",
    }),
  };
});

describe("Scorepad - Replay", () => {
  it("resets inputs when Replay is clicked", async () => {
    render(<Scorepad />);

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "10" } });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
    });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Replay" }));
    });

    const newInputs = screen.getAllByRole("spinbutton");
    expect(newInputs[0]).not.toHaveValue(10);
    expect(newInputs[0]).not.toBeDisabled();
  });

  it("Replay button is visible after winner is determined", async () => {
    render(<Scorepad />);

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "10" } });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Replay" }),
      ).toBeInTheDocument();
    });
  });
});

describe("Scorepad - Edge Cases", () => {
  it("handles very large numbers", async () => {
    render(<Scorepad />);

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "99" } });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
    });

    await waitFor(() => {
      expect(screen.getByText(/The winner is/)).toBeInTheDocument();
    });
  });

  it("sets winner to Player 1 when Player 1 has higher score", async () => {
    render(<Scorepad />);

    const inputs = screen.getAllByRole("spinbutton");
    fireEvent.change(inputs[0], { target: { value: "50" } });

    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
    });

    await waitFor(() => {
      expect(screen.getByText(/The winner is Player 1/)).toBeInTheDocument();
    });
  });

  it("shows correct victory message for military", async () => {
    render(<Scorepad />);

    fireEvent.click(screen.getByRole("button", { name: "Military" }));

    await waitFor(() => {
      expect(
        screen.getByText(/military victory to Player 1/i),
      ).toBeInTheDocument();
    });
  });

  it("shows correct victory message for progress", async () => {
    render(<Scorepad />);

    fireEvent.click(screen.getByRole("button", { name: "Progress" }));

    await waitFor(() => {
      expect(
        screen.getByText(/progress victory to Player 1/i),
      ).toBeInTheDocument();
    });
  });

  it("shows correct victory message for political", async () => {
    render(<Scorepad />);

    fireEvent.click(screen.getByRole("button", { name: "Political" }));

    await waitFor(() => {
      expect(
        screen.getByText(/political victory to Player 1/i),
      ).toBeInTheDocument();
    });
  });
});
