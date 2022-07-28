import { serve } from "https://deno.land/std@0.149.0/http/server.ts";
import { path, rootDir } from '../utils.ts';

export const README = path.join(rootDir, "./github-api-proxy.deno.dev/README.md")

const MD_TO_HTML_API = Deno.env.get("DEV") ? 'http://localhost:3000' : 'https://md2html.deno.dev'

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);
  if (pathname === "/") {
    const md = await Deno.readTextFile(README)
    const res = await fetch(MD_TO_HTML_API, {
      method: 'POST',
      body: md
    })
    return res;
  }

  const url = new URL(pathname.slice(2), "https://api.github.com").toString()
  const res = await fetch(url, {
    headers: request.headers
  })

  return res;
}

serve(handleRequest);
