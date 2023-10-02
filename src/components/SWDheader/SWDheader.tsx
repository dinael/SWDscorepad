
import { FC } from 'react';

import './SWDheader.scss'
export interface SWDheaderProps {
  title?: string
}

export const SWDheader: FC<SWDheaderProps> = ({
  title = '7 Wonder duel scorepad'
}: SWDheaderProps) => {
  return (
    <header className="SWDheader">

      <h1 className="SWDheader-title">
        {title}
      </h1>
    </header>
  );
}

export default SWDheader;

