//import "materialize-css/dist/css/materialize.min.css";
//import "materialize-css/dist/js/materialize.min.js";
// import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.css";
// import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
