type TemplateOptions = {
  app: string;
  body: string;
  style: string;
  env: object;
};

export default function render({ app, body, style, env }: TemplateOptions) {
  return /* html */ `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>React app</title>
    ${style}
    <script>window.env=JSON.parse('${JSON.stringify(env)}');</script>
  </head>
  <body>
    <div id="root">${body}</div>
    <script src="${app}"></script>
  </body>
</html>
`;
}
