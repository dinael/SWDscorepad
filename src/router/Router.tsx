import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Scorepad from "../view/scorepad/Scorepad";
import Splash from "../view/splash/Splash";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Splash />,
  },
  {
    path: "/scorepad",
    element: <Scorepad />,
  },
]);

const Router = () => <RouterProvider router={routes} />;

export default Router;
