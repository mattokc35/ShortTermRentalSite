import React from "react";
import "typeface-cormorant";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";

const rootElement = document.getElementById("root");

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = ReactDOM.createRoot(rootElement);
root.render(app);
