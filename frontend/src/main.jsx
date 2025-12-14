import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import App from "./App";
import ContentProvider from "./context/ContentProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ContentProvider>
        <App />
      </ContentProvider>
    </Router>
  </React.StrictMode>
);
