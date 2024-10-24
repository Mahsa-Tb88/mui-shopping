import App from "../App";
import Login from "../pages/Public/Login";
import Shop from "../pages/Public/shop/Shop";

import PublicLayout from "../layouts/PublicLayout";
import About from "../pages/Public/About";
import Home from "../pages/Public/Home";
import Product from "../pages/Public/shop/Product";
import Cart from "../pages/Public/Cart";
import Register from "../pages/Public/Register";
import Panel from "../pages/Public/Panel";

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
          { path: "shop", element: <Shop /> },
          { path: "products/:id", element: <Product /> },
          { path: "login", element: <Login /> },
          { path: "Register", element: <Register /> },
          { path: "cart", element: <Cart /> },
          { path: "panel", element: <Panel /> },
        ],
      },
    ],
  },
];

export default publicRoutes;
