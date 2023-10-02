import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import Home from '../view/Home'
import Scorepad from '@/view/scorepad/Scorepad'
import Splash from '@/view/splash/Splash'

// import NotFound from '../view/NotFound'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/scorepad",
    element: <Scorepad />,
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // }

]);

const Router = () => <RouterProvider router={routes} />;

export default Router;
