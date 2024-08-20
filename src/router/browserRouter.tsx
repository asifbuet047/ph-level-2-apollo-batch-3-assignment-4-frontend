import AllProductsPage from "../pages/AllProductsPage";
import CartPage from "../pages/CartPage";
import ManageProductsPage from "../pages/ManageProductsPage";
import { BrowserRouterProps, createBrowserRouter } from "react-router-dom";
import NoRouteFoundPage from "../pages/ErrorPages/NoRouteFoundPage";
import App from "../App";
import HomePage from "../pages/HomePage";
import AddProductPage from "../pages/AddProductPage";
import UpdateProductPage from "../pages/UpdateProductPage";
import DeleteProductPage from "../pages/DeleteProductPage";
import ProductDetailPage from "../pages/ProductDetailPage";

const browserRouter: BrowserRouterProps = createBrowserRouter([
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
        element: <AddProductPage></AddProductPage>,
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
      {
        path: "/details/:productId",
        element: <ProductDetailPage></ProductDetailPage>,
      },
    ],
  },
]);

export default browserRouter;
