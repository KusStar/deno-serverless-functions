import { serve } from "https://deno.land/std@0.179.0/http/server.ts";
import { fetchReadmeToHtml, proxyFetch } from '../utils.ts';

async function handleRequest(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/") {
    const res = await fetchReadmeToHtml(import.meta.url)
    return res;
  }

  return proxyFetch(request, url, "api.github.com")
}

serve(handleRequest);
