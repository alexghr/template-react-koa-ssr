import React from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";

import App from "../app";

declare global {
  var env: Record<string, any> | undefined | null;
}

function main() {
  hydrate(
    <>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>,
    document.getElementById("root")
  );
}

main();
