import MainLayout from "@/layouts/MainLayout";
import AllProductsPage from "@/pages/AllProductsPage";
import CartPage from "@/pages/CartPage";
import ManageProductsPage from "@/pages/ManageProductsPage";
import { createBrowserRouter } from "react-router-dom";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/products",
        element: <AllProductsPage />,
      },
      {
        path: "/manage",
        element: <ManageProductsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);

export default browserRouter;
