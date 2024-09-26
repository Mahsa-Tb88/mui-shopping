import App from "../App";
import AdminLayout from "../layouts/AdminLayout";
import Welcome from "../pages/Admin/Welcome";

const adminRoutes = [
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [{ index: true, element: <Welcome /> }],
      },
    ],
  },
];

export default adminRoutes;
