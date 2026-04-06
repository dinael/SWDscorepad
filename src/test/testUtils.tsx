import { ReactNode } from 'react';
import { GameProvider } from '../context/GameContext';
import { render as rtlRender, RenderOptions } from '@testing-library/react';

const render = (ui: ReactNode, options?: RenderOptions) => {
  return rtlRender(<GameProvider>{ui}</GameProvider>, options);
};

export { render };
