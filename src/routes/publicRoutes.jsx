import App from "../App";
import Login from "../pages/Public/Login";
import Register from "../components/Register";
import Shop from "../pages/Public/shop/Shop";

import PublicLayout from "../layouts/PublicLayout";
import About from "../pages/Public/About";
import Home from "../pages/Public/Home";
import Product from "../pages/Public/shop/Product";
import Cart from "../pages/Public/Cart";

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
        ],
      },
    ],
  },
];

export default publicRoutes;
