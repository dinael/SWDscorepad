import { FC, memo } from "react";
import styles from "./SWDvictories.module.scss";

import vp from "/src/assets/images/vp.svg";

type SWDvictoriesProps = {
  showAgora?: boolean;
  disabled?: boolean;
  onMilitaryVictory?: () => void;
  onProgressVictory?: () => void;
  onPoliticalVictory?: () => void;
};

const SWDvictories: FC<SWDvictoriesProps> = memo(
  ({
    showAgora = false,
    disabled = false,
    onMilitaryVictory,
    onProgressVictory,
    onPoliticalVictory,
  }: SWDvictoriesProps) => {
    return (
      <div className={styles.victoryBar}>
        <button
          className={`${styles.victoryBtn} ${styles.military}`}
          disabled={disabled}
          onClick={onMilitaryVictory}
        >
          <img
            className={styles.victorySymbol}
            src={vp}
            alt=""
            aria-hidden="true"
          />
          <span className={styles.victoryLabel}>Military</span>
        </button>
        <button
          className={`${styles.victoryBtn} ${styles.progress}`}
          disabled={disabled}
          onClick={onProgressVictory}
        >
          <img
            className={styles.victorySymbol}
            src={vp}
            alt=""
            aria-hidden="true"
          />
          <span className={styles.victoryLabel}>Progress</span>
        </button>
        {showAgora && (
          <button
            className={`${styles.victoryBtn} ${styles.political}`}
            disabled={disabled}
            onClick={onPoliticalVictory}
          >
            <img
              className={styles.victorySymbol}
              src={vp}
              alt=""
              aria-hidden="true"
            />
            <span className={styles.victoryLabel}>Political</span>
          </button>
        )}
      </div>
    );
  },
);

export default SWDvictories;
