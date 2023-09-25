
import { FC } from 'react';
import styled from 'styled-components'

const Header = {
  Wrapper: styled.header`
    display: flex;
    justify-content: center;
  `,

  Title: styled.h1`
    font-size: 1rem;
  `,
}

export interface SWDheaderProps {
  title?: string
}

export const SWDheader: FC<SWDheaderProps> = ({
  title = '7 Wonder duel scorepad'
}: SWDheaderProps) => {
  return (
    <Header.Wrapper>
      <Header.Title>
        {title}
      </Header.Title>
    </Header.Wrapper>
  );
}

export default SWDheader;

