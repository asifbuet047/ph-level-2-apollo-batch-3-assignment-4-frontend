import MainLayout from "@/layouts/MainLayout";
import AllProductsPage from "@/pages/AllProductsPage";
import CartPage from "@/pages/CartPage";
import ManageProductsPage from "@/pages/ManageProductsPage";
import { createBrowserRouter } from "react-router-dom";
import NoRouteFoundPage from "../pages/NoRouteFoundPage";
import App from "../App";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "products",
        element: <AllProductsPage />,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
      {
        path: "manage",
        element: <ManageProductsPage />,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
      {
        path: "cart",
        element: <CartPage />,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
    ],
    errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
  },
]);

export default browserRouter;
