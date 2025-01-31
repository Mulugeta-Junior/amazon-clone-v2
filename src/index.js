import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { DataProvider } from "./Componenets/Dataprovider/DataProvider";
import { initialState, reducer } from "./Utility/reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <DataProvider reducer={reducer} initialState={initialState}>
        <App />
      </DataProvider>
    </React.StrictMode>
  </BrowserRouter>
);
