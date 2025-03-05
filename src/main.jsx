import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ScrollToTop from "react-scroll-to-top";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ScrollToTop smooth color="#f2f0f5" />
  </React.StrictMode>
);
