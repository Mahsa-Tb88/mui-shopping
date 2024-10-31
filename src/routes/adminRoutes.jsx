import App from "../App";
import AdminLayout from "../layouts/AdminLayout";
import AdminPanel from "../pages/Admin/AdminPanel";
import Products from "../pages/Admin/Products/Products";
import Blogs from "../pages/Admin/Blogs/Blogs";
import Users from "../pages/Admin/Users/Users";
import Categories from "../pages/Admin/Categories/Categories";
import EditProduct from "../pages/Admin/Products/EditProduct";
import AddProduct from "../pages/Admin/Products/AddProduct";
import EditCategory from "../pages/Admin/Categories/EditCategory";
import AddCategory from "../pages/Admin/Categories/AddCategory";
import EditBlog from "../pages/Admin/Blogs/EditBlog";
import AddBlog from "../pages/Admin/Blogs/AddBlog";
import EditUser from "../pages/Admin/Users/EditUser";
import AddUser from "../pages/Admin/Users/AddUser";

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
            children: [
              { index: true, element: <Products /> },
              { path: "edit/:id", element: <EditProduct /> },
              { path: "add", element: <AddProduct /> },
            ],
          },
          {
            path: "blogs",
            children: [
              { index: true, element: <Blogs /> },
              { path: "edit/:id", element: <EditBlog /> },
              { path: "add", element: <AddBlog /> },
            ],
          },
          {
            path: "users",

            children: [
              { index: true, element: <Users /> },
              { path: "edit/:id", element: <EditUser /> },
              { path: "add", element: <AddUser /> },
            ],
          },
          {
            path: "Categories",

            children: [
              { index: true, element: <Categories /> },
              { path: "edit/:id", element: <EditCategory /> },
              { path: "add", element: <AddCategory /> },
            ],
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
