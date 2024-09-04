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
import AboutUsPage from "../pages/AboutUsPage";
import CheckoutPage from "../pages/CheckoutPage";
import PlaceOrderSuccessPage from "../pages/PlaceOrderSuccessPage";
import StripePaymentPage from "../components/StripeCheckoutFormComponent";

const browserRouter: BrowserRouterProps = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/products",
        element: <AllProductsPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/manage",
        element: <ManageProductsPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/manage/add",
        element: <AddProductPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/manage/update",
        element: <UpdateProductPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/manage/delete",
        element: <DeleteProductPage />,
        errorElement: <NoRouteFoundPage />,
      },
      {
        path: "/details/:productId",
        element: <ProductDetailPage />,
      },
      {
        path: "/about",
        element: <AboutUsPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/success",
        element: <PlaceOrderSuccessPage />,
      },
    ],
  },
]);

export default browserRouter;
