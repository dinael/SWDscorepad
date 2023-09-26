import { FC } from 'react';
import styled from 'styled-components';
import vp from '/src/assets/images/vp.svg';

const Victory = {
  Bar: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding-inline: 1rem;
    padding-block: 2rem 1rem;
  `,
  Btn: styled.button`
    appearance: none;
    font-family: var(--SWD-title-font-family);
    font-size: 1rem;
    font-weight: 800;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border: none;
    border-radius: max(0.5rem, 8px);
    cursor: pointer;
    color: var(--SWD-text-color);
    transition: color 0.35s ease-in-out, background 0.35s ease-in-out;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  `,
  Label: styled.span`
    display: block;
    margin-block-start: 0.25rem;
  `,
  Img: styled.img`
    display: block;
    block-size: 100%;
    inline-size: 3rem;
  `,
};

const Military = styled(Victory.Btn)`
  background: rgb(180, 25, 30);
`;

const Progress = styled(Victory.Btn)`
  background: rgb(0, 100, 55);
`;

const Political = styled(Victory.Btn)`
  color: var(--SWD-button-text-color);
  background: hsl(0, 0%, 80%);

  &:hover {
    color: hsl(0, 0%, 80%);
  }
`;

type SWDvictoriesProps = {
  showAgora: boolean;
  onVictory?: (type: string) => void; // Agregamos la prop onVictory
};

const SWDvictories: FC<SWDvictoriesProps> = ({
  showAgora = false,
  onVictory, // Usamos la prop onVictory
}: SWDvictoriesProps) => {
  return (
    <Victory.Bar>
      <Military>
        <Victory.Img src={vp} alt="" aria-hidden="true" />
        <Victory.Label>Military</Victory.Label>
      </Military>
      <Progress>
        <Victory.Img src={vp} alt="" aria-hidden="true" />
        <Victory.Label>Progress</Victory.Label>
      </Progress>
      {showAgora && (
        <Political onClick={() => onVictory('Political')}>
          <Victory.Img src={vp} alt="" aria-hidden="true" />
          <Victory.Label>Political</Victory.Label>
        </Political>
      )}
    </Victory.Bar>
  );
};

export default SWDvictories;
