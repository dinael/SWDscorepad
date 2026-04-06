import { FC } from "react";
import styles from "./SWDfooter.module.scss";

export type SWDfooterProps = {
  title?: string;
};

export const SWDfooter: FC<SWDfooterProps> = ({
  title = "",
}: SWDfooterProps) => {
  return (
    <footer className={styles.wrapper}>
      <p className={styles.title}>
        {title}
        {/* <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.amazon.es/gp/search?ie=UTF8&tag=dinael-21&linkCode=ur2&linkId=766589dbada7e94d9716b44141e8cb31&camp=3638&creative=24630&index=toys&keywords=7 wonder duel"
        >
          Compra 7 wonder duel, sus expansiones y muchos más juegos de mesa
        </a> */}
      </p>
    </footer>
  );
};

export default SWDfooter;
