import { FC, memo, useMemo } from "react";
import styles from "./SWDfooter.module.scss";

export type SWDfooterProps = {
  title?: string;
  name?: string;
  text?: string;
  symbol?: string;
  loading?: boolean;
};

export const SWDfooter: FC<SWDfooterProps> = memo(
  ({
    title = "",
    name = "SWDscorepad",
    text = "All rights reserved",
    symbol = "\u00A9",
    loading = false,
  }: SWDfooterProps) => {
    const currentYear = new Date().getFullYear();

    const copyrightClassName = useMemo(
      () =>
        [styles["copyright"], loading && styles["is-loading"]]
          .filter(Boolean)
          .join(" "),
      [loading],
    );

    return (
      <footer className={styles.wrapper}>
        {title && <p className={styles.title}>{title}</p>}
        <p className={copyrightClassName}>
          {symbol && (
            <span className={styles["copyright-symbol"]}>{symbol}</span>
          )}{" "}
          <span className={styles["copyright-text"]}>
            {currentYear} {name} {text}.
          </span>
        </p>
      </footer>
    );
  },
);

export default SWDfooter;
