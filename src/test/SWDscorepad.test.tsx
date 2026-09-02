import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import { SWDscorepad } from "../components/SWDscorepad/SWDscorepad";
import { fireEvent } from "@testing-library/react";
import { initialInputs, agoraInputs } from "../data/inputValues";

const initialValues = initialInputs.reduce<{ [id: string]: string }>(
  (acc, { id, value }) => {
    acc[id] = value || "";
    return acc;
  },
  {},
);

const Controlled = ({
  showAgora = false,
  showPantheon = false,
  readOnly = false,
  onChange,
}: {
  showAgora?: boolean;
  showPantheon?: boolean;
  readOnly?: boolean;
  onChange: (id: string, value: string) => void;
}) => {
  const [values, setValues] = useState(initialValues);
  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
    onChange(id, value);
  };
  return (
    <SWDscorepad
      name="Player 1"
      showAgora={showAgora}
      showPantheon={showPantheon}
      readOnly={readOnly}
      inputValues={values}
      onChange={handleChange}
    />
  );
};

describe("SWDscorepad", () => {
  describe("rendering", () => {
    it("renders with player name in sr-only heading", () => {
      render(<Controlled onChange={() => {}} />);
      expect(screen.getByText("Player 1's scorepad")).toHaveClass("sr-only");
    });

    it("renders all initial inputs", () => {
      render(<Controlled onChange={() => {}} />);
      const inputs = screen.getAllByRole("spinbutton");
      expect(inputs.length).toBeGreaterThan(0);
    });

    it("does not render Agora section by default", () => {
      render(<Controlled onChange={() => {}} />);
      expect(screen.queryByText("Agora")).not.toBeInTheDocument();
    });

    it("does not render Pantheon section by default", () => {
      render(<Controlled onChange={() => {}} />);
      expect(screen.queryByText("Pantheon")).not.toBeInTheDocument();
    });

    it("renders Agora section when showAgora is true", () => {
      render(<Controlled showAgora onChange={() => {}} />);
      expect(screen.getByText("Agora")).toBeInTheDocument();
    });

    it("renders Pantheon section when showPantheon is true", () => {
      render(<Controlled showPantheon onChange={() => {}} />);
      expect(screen.getByText("Pantheon")).toBeInTheDocument();
    });

    it("renders both Agora and Pantheon sections when both props are true", () => {
      render(
        <Controlled showAgora showPantheon onChange={() => {}} />,
      );
      expect(screen.getByText("Agora")).toBeInTheDocument();
      expect(screen.getByText("Pantheon")).toBeInTheDocument();
    });
  });

  describe("input interactions", () => {
    it("calls onChange when input changes", () => {
      const handleChange = vi.fn();
      render(<Controlled onChange={handleChange} />);

      const firstInput = screen.getAllByRole("spinbutton")[0];
      fireEvent.change(firstInput, { target: { value: "5" } });

      expect(handleChange).toHaveBeenCalled();
    });

    it("passes input id and value to onChange", () => {
      const handleChange = vi.fn();
      render(<Controlled onChange={handleChange} />);

      const firstInput = screen.getAllByRole("spinbutton")[0];
      fireEvent.change(firstInput, { target: { value: "10" } });

      expect(handleChange).toHaveBeenCalledWith("input1", "10");
    });

    it("handles multiple input changes", () => {
      const handleChange = vi.fn();
      render(<Controlled onChange={handleChange} />);

      const inputs = screen.getAllByRole("spinbutton");
      fireEvent.change(inputs[0], { target: { value: "5" } });
      fireEvent.change(inputs[1], { target: { value: "3" } });

      expect(handleChange).toHaveBeenCalledTimes(2);
    });

    it("includes Agora input ids in onChange when enabled", () => {
      const handleChange = vi.fn();
      render(<Controlled showAgora onChange={handleChange} />);

      const inputs = screen.getAllByRole("spinbutton");
      const agoraInput = inputs[inputs.length - 1];
      fireEvent.change(agoraInput, { target: { value: "2" } });

      expect(handleChange).toHaveBeenCalledWith(agoraInputs[0].id, "2");
    });
  });

  describe("readOnly state", () => {
    it("all inputs are editable by default", () => {
      render(<Controlled onChange={() => {}} />);
      const inputs = screen.getAllByRole("spinbutton");
      inputs.forEach((input) => expect(input).not.toBeDisabled());
    });

    it("all inputs are disabled when readOnly is true", () => {
      render(<Controlled readOnly onChange={() => {}} />);
      const inputs = screen.getAllByRole("spinbutton");
      inputs.forEach((input) => expect(input).toBeDisabled());
    });

    it("inputs are enabled when readOnly is false", () => {
      render(<Controlled readOnly={false} onChange={() => {}} />);
      const inputs = screen.getAllByRole("spinbutton");
      inputs.forEach((input) => expect(input).not.toBeDisabled());
    });
  });
});
