import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { browserRouter } from "./router/browserRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={ReduxStore.store}>
      <PersistGate loading={null} persistor={ReduxStore.persistor}>
        <RouterProvider router={browserRouter} />
      </PersistGate>
    </Provider>

    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={true}
    />
  </React.StrictMode>
);
