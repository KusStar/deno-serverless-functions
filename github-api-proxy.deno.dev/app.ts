import { serve } from "https://deno.land/std@0.149.0/http/server.ts";
import * as path from "https://deno.land/std@0.149.0/path/mod.ts";

const __dirname = new URL('.', import.meta.url).pathname;

const README = path.join(__dirname, "README.md")

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/") {
    return new Response(await Deno.readFile(README));
  }

  const url = new URL(pathname.slice(1), "https://api.github.com").toString()
  const res = await fetch(url, {
    headers: request.headers
  })

  return res;
}

serve(handleRequest);
