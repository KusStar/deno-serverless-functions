import * as path from "https://deno.land/std@0.179.0/path/mod.ts";

export { path }

export const dirname = (metaUrl: string) => new URL('.', metaUrl).pathname;

const MD_TO_HTML_API = Deno.env.get("DEV") ? 'http://localhost:3000' : 'https://md2html.deno.dev'

export const fetchReadmeToHtml = async (metaUrl: string) => {
  const README = path.join(dirname(metaUrl), "./README.md")

  const md = await Deno.readTextFile(README)

  const res = await fetch(MD_TO_HTML_API, {
    method: 'POST',
    body: md
  })

  return res
}

export const proxyFetch = async (request: Request, url: URL, host: string) => {
  url.hostname = host
  url.port = ""
  url.protocol = "https:"

  const res = await fetch(url.href, {
    method: request.method,
    headers: request.headers,
    body: request.body
  })

  return res;
}