import { serve } from "https://deno.land/std@0.149.0/http/server.ts";
import { fetchReadmeToHtml } from '../utils.ts';

async function handleRequest(request: Request) {
  let { pathname } = new URL(request.url);
  if (pathname === "/") {
    const res = await fetchReadmeToHtml(import.meta.url)
    return res;
  }

  if (pathname.startsWith('/') || pathname.startsWith('//')) {
    pathname = pathname.slice(1);
  }

  const url = new URL(pathname, "https://api.github.com").toString()

  const res = await fetch(url, {
    method: request.method,
    headers: request.headers,
    body: request.body
  })

  return res;
}

serve(handleRequest);
