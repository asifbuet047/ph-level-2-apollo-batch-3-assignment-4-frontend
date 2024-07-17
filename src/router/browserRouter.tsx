import MainLayout from "@/layouts/MainLayout";
import AllProductsPage from "../pages/AllProductsPage";
import CartPage from "../pages/CartPage";
import ManageProductsPage from "../pages/ManageProductsPage";
import { createBrowserRouter } from "react-router-dom";
import NoRouteFoundPage from "../pages/NoRouteFoundPage";
import App from "../App";
import HomePage from "../pages/HomePage";
import AddProduct from "../pages/AddProductPage";
import UpdateProductPage from "../pages/UpdateProductPage";
import DeleteProductPage from "../pages/DeleteProductPage";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
      {
        path: "/products",
        element: <AllProductsPage />,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
      {
        path: "/manage",
        element: <ManageProductsPage />,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
      {
        path: "/cart",
        element: <CartPage />,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
      {
        path: "/manage/add",
        element: <AddProduct></AddProduct>,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
      {
        path: "/manage/update",
        element: <UpdateProductPage></UpdateProductPage>,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
      {
        path: "/manage/delete",
        element: <DeleteProductPage></DeleteProductPage>,
        errorElement: <NoRouteFoundPage></NoRouteFoundPage>,
      },
    ],
  },
]);

export default browserRouter;
