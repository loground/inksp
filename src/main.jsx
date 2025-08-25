import { extend } from "@react-three/fiber";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { WaterMaterial } from "./components/WaterMaterial.jsx";
import "./index.css";
extend({ WaterMaterial });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
