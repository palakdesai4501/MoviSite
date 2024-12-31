import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
