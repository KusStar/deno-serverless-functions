import { CSS, render } from "https://deno.land/x/gfm@0.1.22/mod.ts";

import "https://esm.sh/prismjs@1.27.0/components/prism-typescript?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-diff?no-check";
import "https://esm.sh/prismjs@1.27.0/components/prism-bash?no-check";

export const toHTML = (md: string) => {
  const body = render(md)
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        background-color: var(--color-canvas-default);
      }
      main {
        max-width: 800px;
        margin: 0 auto;
      }
      ${CSS}
    </style>
  </head>
  <body data-color-mode="auto" data-light-theme="light" data-dark-theme="dark" class="markdown-body">
    <main>
    ${body}
    </main>
  </body>
</html>
`;
  return html
}