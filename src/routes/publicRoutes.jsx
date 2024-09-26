import App from "../App";
import PublicLayout from "../layouts/PublicLayout";
import About from "../pages/Public/About";
import Home from "../pages/Public/Home";

const publicRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "about", element: <About /> },
        ],
      },
    ],
  },
];

export default publicRoutes;
