import { FC } from 'react';

import './SWDfooter.scss'

import logo from '@/assets/images/logo.svg'

export interface SWDfooterProps {
  title?: string
}

export const SWDheader: FC<SWDfooterProps> = ({
  title = ''
}: SWDfooterProps) => {
  return (
    <footer className='SWDfooter'>
      <img
        className='swd-logo'
        src={logo}
        alt="7 wonders score pad logo" aria-hidden="true" />
      <p>
        {title}
        <a
          target="_blank"
          href="https://www.amazon.es/gp/search?ie=UTF8&tag=dinael-21&linkCode=ur2&linkId=766589dbada7e94d9716b44141e8cb31&camp=3638&creative=24630&index=toys&keywords=7 wonder duel">
          Compra 7 wonder duel, sus expansiones y muchos más juegos de mesa
        </a>
      </p>
    </footer>
  );
}

export default SWDheader;

