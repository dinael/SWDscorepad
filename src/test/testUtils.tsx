import { ReactNode, createContext, useState } from "react";
import { GameProvider } from "../context/GameContext";
import { render as rtlRender, RenderOptions } from "@testing-library/react";

type TestGameContextType = {
  showAgora: boolean;
  showPantheon: boolean;
  toggleAgora: () => void;
  togglePantheon: () => void;
  language: string;
};

const TestGameContext = createContext<TestGameContextType | undefined>(
  undefined,
);

const TestProviderWithAgora = ({ children }: { children: ReactNode }) => {
  const [showAgora, setShowAgora] = useState(true);
  return (
    <TestGameContext.Provider
      value={{
        showAgora,
        showPantheon: false,
        toggleAgora: () => setShowAgora(!showAgora),
        togglePantheon: () => {},
        language: "en",
      }}
    >
      {children}
    </TestGameContext.Provider>
  );
};

const render = (ui: ReactNode, options?: RenderOptions) => {
  return rtlRender(<GameProvider>{ui}</GameProvider>, options);
};

export const renderWithAgora = (ui: ReactNode, options?: RenderOptions) => {
  return rtlRender(
    <TestProviderWithAgora>{ui}</TestProviderWithAgora>,
    options,
  );
};

export { render };
