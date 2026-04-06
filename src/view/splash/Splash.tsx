
import { FC } from 'react';

import SWDconfig from '@/components/SWDconfig/SWDconfig'

export type SplashProps = {
  id?: string
}

export const Splash: FC<SplashProps> = (
  ...props
) => {
  return (
    <div
      className="splash"
      {...props} >
      <SWDconfig />
    </div>
  );
}

export default Splash
