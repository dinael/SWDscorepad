
import { FC } from 'react';
import styled from 'styled-components'

const Footer = {
  Wrapper: styled.footer`
    display: flex;
    justify-content: center;
  `,

  Title: styled.p`
    font-size: 1rem;
  `,
}

export interface SWDfooterProps {
  title?: string
}

export const SWDheader: FC<SWDfooterProps> = ({
  title = ''
}: SWDfooterProps) => {
  return (
    <Footer.Wrapper>
      <Footer.Title>
        {title}
        <a
          target="_blank"
          href="https://www.amazon.es/gp/search?ie=UTF8&tag=dinael-21&linkCode=ur2&linkId=766589dbada7e94d9716b44141e8cb31&camp=3638&creative=24630&index=toys&keywords=7 wonder duel">
          Compra 7 wonder duel, sus expansiones y muchos más juegos de mesa
        </a>
      </Footer.Title>
    </Footer.Wrapper>
  );
}

export default SWDheader;

