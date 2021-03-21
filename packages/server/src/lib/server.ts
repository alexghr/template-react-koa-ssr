import Koa from "koa";
import serveStatic from "koa-static";
import { PORT } from "./config";
import { render, staticDir } from "react-app";

export default async function createServer() {
  const server = new Koa();
  server.use(async (ktx, next) => {
    try {
      await next();
    } catch (err) {
      console.error(
        "Error processing request %s %s: %o",
        ktx.method,
        ktx.path,
        err
      );
      ktx.status = 500;
      ktx.body = "Internal server error";
    }
  });

  server.use((ktx, next) => {
    if (ktx.path === '/health') {
      ktx.status = 204;
    } else {
      return next();
    }
  });

  server.use(serveStatic(staticDir));
  server.use(
    (ktx) =>
      (ktx.body = render({
        env: {},
        url: ktx.URL,
      }))
  );

  return () => server.listen(PORT, () => {
    console.log("Server listening on port %d", PORT);
  });
}
