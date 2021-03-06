import * as path from "https://deno.land/std@0.149.0/path/mod.ts";

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