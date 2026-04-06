import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Scorepad from "../view/scorepad/Scorepad";
import Splash from "../view/splash/Splash";
import ErrorPage from "../view/ErrorPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Scorepad />,
  },
  {
    path: "/scorepad",
    element: <Scorepad />,
  },
  {
    path: "/splash",
    element: <Splash />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

const Router = () => <RouterProvider router={routes} />;

export default Router;
