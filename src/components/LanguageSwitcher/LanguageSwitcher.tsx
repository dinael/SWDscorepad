import { FC } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "es" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        background: "none",
        border: "none",
        color: "var(--swd-color-primary)",
        cursor: "pointer",
        fontSize: "0.875rem",
        padding: "0.5rem",
      }}
    >
      {i18n.language === "en" ? "ES" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;
