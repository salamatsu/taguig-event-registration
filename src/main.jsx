import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import store, { persistor } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#366ea0",
            colorSecond: "#59b2de",
            colorSuccess: "#076901",
            colorSecondary: "#c5c5c5",
            fontFamily: "Poppins, sans-serif",
            colorBgBase: "#fff",
          },
        }}
      >
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
