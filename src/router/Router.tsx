import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Scorepad from "../view/scorepad/Scorepad";
import Splash from "../view/splash/Splash";
import ErrorPage from "../view/ErrorPage";
import ErrorBoundary from "../view/ErrorBoundary";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Scorepad />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/scorepad",
    element: <Scorepad />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/splash",
    element: <Splash />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />,
  },
]);

const Router = () => (
  <ErrorBoundary>
    <RouterProvider router={routes} />
  </ErrorBoundary>
);

export default Router;
