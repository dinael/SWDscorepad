import { FC, ChangeEvent } from 'react'

import './SWDconfig.scss'

import SWDinput from '@/components/SWDinput/SWDinput';

export type SWDConfigProps = {
  player1: string;
  player2: string;
  agoraChecked: boolean;
  pantheonChecked: boolean;
  handlePlayer1Change: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePlayer2Change: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAgoraChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handlePantheonChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SWDconfig: FC<SWDConfigProps> = ({
  player1,
  player2,
  agoraChecked,
  pantheonChecked,
  handlePlayer1Change,
  handlePlayer2Change,
  handleAgoraChange,
  handlePantheonChange,
}) => {
  return (
    <section className="swd-config">
      <h2>Player names</h2>
      <SWDinput
        className="ludio-i"
        id={"player1"}
        label={"Ludio I"}
        type="text"
        showLabel
        variant={"vertical"}
        value={player1}
        maxLength={20}
        onChange={handlePlayer1Change}
      />
      <SWDinput
        className="ludio-ii"
        id={"player2"}
        label={"Ludio II"}
        type="text"
        showLabel
        variant={"vertical"}
        value={player2}
        maxLength={20}
        onChange={handlePlayer2Change}
      />
      <div className="config-expansions">
        <h2>Expansions</h2>
        <label>
          Agora
          <input
            className="btn-check check-agora"
            type="checkbox"
            id="config-agora"
            checked={agoraChecked}
            onChange={handleAgoraChange}
          />
        </label>
        <label>
          Pantheon
          <input
            className="btn-check check-pantheon"
            type="checkbox"
            id="config-pantheon"
            checked={pantheonChecked}
            onChange={handlePantheonChange}
          />
        </label>
      </div>
    </section>
  );
};

export default SWDconfig;
