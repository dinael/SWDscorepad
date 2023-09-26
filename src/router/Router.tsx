import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// import Home from '../view/Home'
// import Podcast from '../view/Podcast'
// import Episode from '../view/Episode'
// import NotFound from '../view/NotFound'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/podcast/:podcastId",
    element: <Podcast />,
  },
  {
    path: "/podcast/:podcastId/episode/:trackId/",
    element: <Episode />,
  },
  {
    path: "*",
    element: <NotFound />,
  }

]);

const Router = () => <RouterProvider router={routes} />;

export default Router;
