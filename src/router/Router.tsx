import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import Home from '../view/Home'
import Scorepad from '../view/Scorepad'
// import NotFound from '../view/NotFound'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Scorepad />,
  },
  // {
  //   path: "*",
  //   element: <NotFound />,
  // }

]);

const Router = () => <RouterProvider router={routes} />;

export default Router;
