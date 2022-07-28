import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'
import hljs from "https://jspm.dev/highlight.js@11.0.1";

import { path, rootDir } from '../utils.ts';

const README_PATH = path.join(rootDir, './md2html.deno.dev/README.md')

const toHTML = (md: string) => {
  Marked.setOptions({
    highlight: (code, lang) => {
      // deno-lint-ignore ban-ts-comment
      // @ts-expect-error
      code = hljs.highlight(code, { language: lang }).value
      return code
    }
  })
  const cssCDN = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css">`
  const parsed = Marked.parse(md)
  return cssCDN + parsed.content
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
  port: Number(Deno.env.get('PORT')) ||  8000
});