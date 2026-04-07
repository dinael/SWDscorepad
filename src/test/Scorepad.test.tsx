import { describe, it, expect, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { render } from "./testUtils";
import { Scorepad } from "../view/scorepad/Scorepad";
import { fireEvent } from "@testing-library/react";

vi.mock("../assets/images/vp-2.svg", () => ({ default: "/vp-2.svg" }));

describe("Scorepad", () => {
  describe("initial render", () => {
    it("renders section element", () => {
      render(<Scorepad />);
      const section = document.querySelector("section");
      expect(section).toBeInTheDocument();
    });

    it("renders with default player names", () => {
      render(<Scorepad />);
      expect(
        screen.getByRole("button", { name: "Player 1" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Player 2" }),
      ).toBeInTheDocument();
    });

    it("renders Calculate button", () => {
      render(<Scorepad />);
      expect(
        screen.getByRole("button", { name: "Calculate" }),
      ).toBeInTheDocument();
    });

    it("Calculate button is disabled when totals are 0", () => {
      render(<Scorepad />);
      expect(screen.getByRole("button", { name: "Calculate" })).toBeDisabled();
    });

    it("renders tab and victory buttons", () => {
      render(<Scorepad />);
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThanOrEqual(5);
    });
  });

  describe("calculate winner", () => {
    it("shows winner when Calculate is clicked with different totals", async () => {
      render(<Scorepad />);

      const inputs = screen.getAllByRole("spinbutton");
      fireEvent.change(inputs[0], { target: { value: "10" } });

      await waitFor(() => {
        fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
      });

      await waitFor(() => {
        expect(screen.getByText(/The winner is/)).toBeInTheDocument();
      });
    });

    it("button shows Replay after winner is determined", async () => {
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

    it("inputs become readOnly after winner", async () => {
      render(<Scorepad />);

      const inputs = screen.getAllByRole("spinbutton");
      fireEvent.change(inputs[0], { target: { value: "10" } });

      await waitFor(() => {
        fireEvent.click(screen.getByRole("button", { name: "Calculate" }));
      });

      await waitFor(() => {
        expect(screen.getAllByRole("spinbutton")[0]).toBeDisabled();
      });
    });
  });

  describe("victory flow", () => {
    it("shows victory message when victory button is clicked", async () => {
      render(<Scorepad />);

      fireEvent.click(screen.getByRole("button", { name: "Military" }));

      await waitFor(() => {
        expect(screen.getByText(/military victory to/)).toBeInTheDocument();
      });
    });

    it("victory buttons are disabled after victory", async () => {
      render(<Scorepad />);

      fireEvent.click(screen.getByRole("button", { name: "Military" }));

      await waitFor(() => {
        expect(screen.getByRole("button", { name: "Military" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Progress" })).toBeDisabled();
      });
    });

    it("does not allow multiple victories", async () => {
      render(<Scorepad />);

      fireEvent.click(screen.getByRole("button", { name: "Military" }));

      await waitFor(() => {
        fireEvent.click(screen.getByRole("button", { name: "Progress" }));
      });

      expect(screen.queryByText(/progress victory/)).not.toBeInTheDocument();
    });
  });
});
