import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { ReduxStore } from "./redux/store.ts";
import { RouterProvider } from "react-router-dom";
import browserRouter from "./router/browserRouter.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={ReduxStore.store}>
      <RouterProvider router={browserRouter}>
        <PersistGate loading={null} persistor={ReduxStore.persistor}>
          <App />
        </PersistGate>
      </RouterProvider>
    </Provider>

    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={true}
    />
  </React.StrictMode>
);
