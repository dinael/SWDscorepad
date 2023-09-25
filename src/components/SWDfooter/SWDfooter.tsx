
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
  title = 'footer'
}: SWDfooterProps) => {
  return (
    <Footer.Wrapper>
      <Footer.Title>
        {title}
      </Footer.Title>
    </Footer.Wrapper>
  );
}

export default SWDheader;

