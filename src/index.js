import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";

ReactDOM.render(<App />, document.getElementById("root"));

if (module.hot) {
  module.hot.dispose(function() {
    // module is about to be replaced
  });
  module.hot.accept();
}
