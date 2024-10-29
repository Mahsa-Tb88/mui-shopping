import App from "../App";
import AdminLayout from "../layouts/AdminLayout";
import AdminPanel from "../pages/Admin/AdminPanel";
import Products from "../pages/Admin/Products/Products";
import Blogs from "../pages/Admin/Blogs/Blogs";
import Users from "../pages/Admin/Users/Users";
import Categories from "../pages/Admin/Categories/Categories";
import EditProduct from "../pages/Admin/Products/EditProduct";
import AddProduct from "../pages/Admin/Products/AddProduct";

const adminRoutes = [
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminPanel /> },
          {
            path: "products",
            element: <Products />,
            children: [
              { path: "edit/:id", element: <EditProduct /> },
              { path: "add", element: <AddProduct /> },
            ],
          },
          { path: "blogs", element: <Blogs /> },
          { path: "users", element: <Users /> },
          { path: "Categories", element: <Categories /> },
        ],
      },
    ],
  },
];

export default adminRoutes;
