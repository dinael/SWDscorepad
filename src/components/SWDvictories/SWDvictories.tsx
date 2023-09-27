import { FC } from 'react';
import './SWDvictories.scss'

import vp from '/src/assets/images/vp.svg';

type SWDvictoriesProps = {
  showAgora: boolean;
  onMilitaryVictory?: () => void;
  onProgressVictory?: () => void;
  onPoliticalVictory?: () => void;
};

const SWDvictories: FC<SWDvictoriesProps> = ({
  showAgora = false,
  onMilitaryVictory,
  onProgressVictory,
  onPoliticalVictory
}: SWDvictoriesProps) => {
  return (
    <div className='victory-bar'>
      <button
        className='victory-btn military'
        onClick={() => onMilitaryVictory && onMilitaryVictory()}>
        <img className='victory-symbol' src={vp} alt="" aria-hidden="true" />
        <span className='victory-label'>Military</span>
      </button>
      <button
        className='victory-btn progress'
        onClick={() => onProgressVictory && onProgressVictory()}>
        <img className='victory-symbol' src={vp} alt="" aria-hidden="true" />
        <span className='victory-label'>Progress</span>
      </button>
      {showAgora && (
        <button
          className='victory-btn political'
          onClick={() => onPoliticalVictory && onPoliticalVictory()}>
          <img className='victory-symbol' src={vp} alt="" aria-hidden="true" />
          <span className='victory-label'>Political</span>
        </button>
      )}
    </div>
  );
};


export default SWDvictories;
