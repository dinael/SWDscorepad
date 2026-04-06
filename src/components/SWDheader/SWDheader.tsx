import { FC, useState } from "react";
import { useGame } from "../../context/GameContext";
import styles from "./SWDheader.module.scss";

export type SWDheaderProps = {
  title?: string;
};

export const SWDheader: FC<SWDheaderProps> = ({
  title = "7 Wonder duel scorepad",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { showAgora, showPantheon, toggleAgora, togglePantheon } = useGame();

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.menuContainer}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
        {menuOpen && (
          <nav className={styles.menu}>
            <p>Expansions:</p>
            <label className={styles.menuItem}>
              <input
                type="checkbox"
                checked={showAgora}
                onChange={toggleAgora}
              />
              <span>Agora</span>
            </label>
            <label className={styles.menuItem}>
              <input
                type="checkbox"
                checked={showPantheon}
                onChange={togglePantheon}
              />
              <span>Pantheon</span>
            </label>
          </nav>
        )}
      </div>
    </header>
  );
};

export default SWDheader;
