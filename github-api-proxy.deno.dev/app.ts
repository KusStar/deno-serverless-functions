import { serve } from "https://deno.land/std@0.149.0/http/server.ts";
import { fetchReadmeToHtml } from '../utils.ts';

async function handleRequest(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    const res = await fetchReadmeToHtml(import.meta.url)
    return res;
  }

  url.hostname = "api.github.com"
  url.port = ""
  url.protocol = "https:"

  const res = await fetch(url.href, {
    method: request.method,
    headers: request.headers,
    body: request.body
  })

  return res;
}

serve(handleRequest);
