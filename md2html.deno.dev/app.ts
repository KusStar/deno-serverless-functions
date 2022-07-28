import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { Marked } from 'https://deno.land/x/markdown@v2.0.0/mod.ts'
import { path, dirname } from '../utils.ts';

const README_PATH = path.join(dirname(import.meta.url), './README.md')

const TPL_PATH = path.join(dirname(import.meta.url), './template.html')

const TPL = await Deno.readTextFile(TPL_PATH)

Marked.setOptions({
  langPrefix: 'shj-lang-'
})


const toHTML = (md: string) => {
  const parsed = Marked.parse(md)
  return TPL.replace('{{content}}', parsed.content)
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