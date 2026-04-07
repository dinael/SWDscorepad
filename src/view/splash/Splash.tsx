import { FC } from "react";

export type SplashProps = {
  id?: string;
};

export const Splash: FC<SplashProps> = (...props) => {
  return (
    <div className="splash" {...props}>
      <p>Loading...</p>
    </div>
  );
};

export default Splash;
