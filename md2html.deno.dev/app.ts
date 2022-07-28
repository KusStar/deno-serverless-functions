import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'

import { path, dirname } from '../utils.ts';

const README_PATH = path.join(dirname(import.meta.url), './README.md')

Marked.setOptions({
  langPrefix: 'shj-lang-'
})

const cssCDN = `
<link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura.css" media="screen" />
<link rel="stylesheet" href="https://unpkg.com/sakura.css/css/sakura-dark.css" media="screen and (prefers-color-scheme: dark)" />

<link rel="stylesheet" href="https://unpkg.com/@speed-highlight/core/dist/themes/github-light.css" media="screen">
<link rel="stylesheet" href="https://unpkg.com/@speed-highlight/core/dist/themes/github-dark.css" media="screen and (prefers-color-scheme: dark)">
`

const styles = `<style>

@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&display=swap');

body {
  display: flex;
  justify-content: center;
  align-items: center;
}
pre {
  border-radius: 1rem;
}
code {
  font: 18px 'Fira Code', monospace !important
}
img {
  margin: 0;
}
</style>`

const scripts = `
<script type="module">
  import { highlightAll } from 'https://unpkg.com/@speed-highlight/core@1.1.7/dist/index.js';
  highlightAll({
    hideLineNumbers: false
  });
</script>
`

const toHTML = (md: string) => {
  const parsed = Marked.parse(md)
  return `<head>${cssCDN}${styles}</head>` + `<body><div>${parsed.content}</div>${scripts}</body>`
}

const RES_OPTIONS = {
  headers: {
    'Content-Type': 'text/html',
  }
}

async function handleRequest(request: Request) {
  if (!request.body) {
    const md = await Deno.readTextFile(README_PATH)
    return new Response(toHTML(md), RES_OPTIONS);
  }
  const md = await request.text();

  return new Response(toHTML(md), RES_OPTIONS)
}

serve(handleRequest, {
  port: Number(Deno.env.get('PORT')) || 8000
});