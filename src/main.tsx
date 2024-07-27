import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import browserRouter from "./router/browserRouter.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter}>
        <App />
      </RouterProvider>
    </Provider>
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={true}
    />
  </React.StrictMode>
);
