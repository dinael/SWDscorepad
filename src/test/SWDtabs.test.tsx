import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SWDtabs } from "../components/SWDtabs/SWDtabs";
import { fireEvent } from "@testing-library/react";

const MockChild = ({ name }: { name: string }) => (
  <div data-testid={`tab-content-${name}`}>{name} Content</div>
);

describe("SWDtabs", () => {
  describe("rendering", () => {
    it("renders both tab names", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );
      expect(
        screen.getByRole("button", { name: "Player 1" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Player 2" }),
      ).toBeInTheDocument();
    });

    it("renders first tab content by default", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );
      expect(screen.getByTestId("tab-content-Tab1")).toBeInTheDocument();
    });

    it("hides second tab content by default", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );
      const tab2Content = screen.getByTestId("tab-content-Tab2");
      expect(tab2Content).toBeInTheDocument();
      expect(tab2Content.parentElement).toHaveClass(/Hidden/);
    });
  });

  describe("tab switching", () => {
    it("switches to second tab when clicked", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Player 2" }));
      expect(screen.getByTestId("tab-content-Tab2")).toBeVisible();
    });

    it("calls onTabChange when tab is clicked", () => {
      const handleTabChange = vi.fn();
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={handleTabChange}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Player 2" }));
      expect(handleTabChange).toHaveBeenCalledWith("Player 2");
    });

    it("switches back to first tab when clicked again", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );

      fireEvent.click(screen.getByRole("button", { name: "Player 2" }));
      fireEvent.click(screen.getByRole("button", { name: "Player 1" }));

      expect(screen.getByTestId("tab-content-Tab1")).toBeVisible();
    });
  });

  describe("total display", () => {
    it("displays total1 when greater than 0", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={10}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );
      expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("displays total2 when greater than 0", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={20}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );
      expect(screen.getByText("20")).toBeInTheDocument();
    });

    it("does not display total when 0", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );
      expect(screen.queryByText("0")).not.toBeInTheDocument();
    });
  });

  describe("active tab styling", () => {
    it("first tab has active styling by default", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );
      const tab1Btn = screen.getByRole("button", { name: "Player 1" });
      expect(tab1Btn.className).toContain("active");
    });

    it("second tab does not have active styling by default", () => {
      render(
        <SWDtabs
          tabName1="Player 1"
          tabName2="Player 2"
          total1={0}
          total2={0}
          onTabChange={() => {}}
        >
          <MockChild name="Tab1" />
          <MockChild name="Tab2" />
        </SWDtabs>,
      );
      const tab2Btn = screen.getByRole("button", { name: "Player 2" });
      expect(tab2Btn.className).not.toContain("active");
    });
  });
});
