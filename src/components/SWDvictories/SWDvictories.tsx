import { FC } from 'react';
import styled from 'styled-components'
import vp from '/src/assets/images/vp.svg'

const Victory = {
  Bar: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  `,
  Btn: styled.button`
    appearance: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border: max(1px, 1px) solid var(--SWD-color-primary);
    border-radius: max(0.5rem, 8px);
    cursor: pointer;
    transition: color .35s ease-in-out, background .35s ease-in-out;

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
}

const Military = styled(Victory.Btn)`
  background: rgb(180, 25, 30);
`

const Progress = styled(Victory.Btn)`
  background: rgb(0, 100, 55);
`

const Political = styled(Victory.Btn)`
  color: hsl(0, 0%, 0%);
  background: rgb(244, 244, 244);

  &:hover {
    color: rgb(244, 244, 244);
  }
`

export type SWDvictoriesProps = {
  showAgora: boolean
}

export const SWDvictories: FC<SWDvictoriesProps> = ({
  showAgora = false
}: SWDvictoriesProps) => {

  return (
    <Victory.Bar>
      <Military>
        <Victory.Img src={vp} alt="" aria-hidden="true" />
        <Victory.Label>
          Military
        </Victory.Label>
      </Military>
      <Progress>
        <Victory.Img src={vp} alt="" aria-hidden="true" />
        <Victory.Label>
          Progress
        </Victory.Label>
      </Progress>
      {showAgora && (
        <Political>
          <Victory.Img src={vp} alt="" aria-hidden="true" />
          <Victory.Label>
            Political
          </Victory.Label>
        </Political>
      )}
    </Victory.Bar>
  );
};


export default SWDvictories