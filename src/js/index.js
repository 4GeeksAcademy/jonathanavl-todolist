// index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./component/app";
import "../styles/index.css"; // Asegúrate de que este archivo esté en el lugar correcto

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app") // Asegúrate de que el elemento con id="app" esté presente en tu HTML
);
