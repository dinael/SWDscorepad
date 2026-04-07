import { FC, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "../../context/GameContext";
import styles from "./SWDheader.module.scss";

export type SWDheaderProps = {
  title?: string;
};

export const SWDheader: FC<SWDheaderProps> = ({
  title = "7 Wonder duel scorepad",
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { showAgora, showPantheon, toggleAgora, togglePantheon } = useGame();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const languages = ["la", "en", "es"];

  return (
    <header className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.menuContainer} ref={menuRef}>
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
            <p className={styles.menuTitle}>{t("expansions")}:</p>
            <label className={styles.menuItem}>
              <input
                type="checkbox"
                checked={showAgora}
                onChange={toggleAgora}
              />
              <span>{t("agora")}</span>
            </label>
            <label className={styles.menuItem}>
              <input
                type="checkbox"
                checked={showPantheon}
                onChange={togglePantheon}
              />
              <span>{t("pantheon")}</span>
            </label>
            <p className={styles.menuTitle}>{t("language")}:</p>
            {languages.map((lang) => (
              <label key={lang} className={styles.menuItem}>
                <input
                  type="radio"
                  name="language"
                  value={lang}
                  checked={i18n.language === lang}
                  onChange={() => i18n.changeLanguage(lang)}
                />
                <span>{lang.toUpperCase()}</span>
              </label>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default SWDheader;
