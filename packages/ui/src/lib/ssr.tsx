import React from "react";
import { renderToString } from "react-dom/server";
import { ServerStyleSheet } from "styled-components";
import { StaticRouter } from "react-router-dom";
import App from "../app";
import template from "./template";

type RenderProps = {
  env: object;
  url: URL;
};

export function render({ env, url }: RenderProps) {
  const stylesheet = new ServerStyleSheet();
  let body: string = '';

  try {
    body = renderToString(
      stylesheet.collectStyles(
        <>
          <StaticRouter
            location={{
              pathname: url.pathname,
              search: url.search,
              hash: url.hash,
            }}
          >
            <App />
          </StaticRouter>
        </>
      )
    );
  } catch (err) {
    // no-op
  }

  return template({
    app: "/app.js",
    body,
    style: stylesheet.getStyleTags(),
    env,
  });
}
