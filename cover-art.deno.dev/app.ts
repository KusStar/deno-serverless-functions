import { serve } from "https://deno.land/std@0.179.0/http/server.ts";
import { fetchReadmeToHtml } from '../utils.ts';
import { getCoverUrl } from "./parsers/index.ts";

const cache = new Map<string, string>()

async function handleRequest(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const res = await fetchReadmeToHtml(import.meta.url)
    return res;
  }
  if (url.pathname === '/favicon.ico') {
    return new Response(null)
  }
  let target = decodeURIComponent(url.pathname).slice(1)
  if (target.endsWith('/')) {
    target = target.slice(0, -1)
  }
  if (cache.has(target)) {
    return new Response(cache.get(target))
  }
  const coverUrl = await getCoverUrl(target)
  if (coverUrl) {
    cache.set(target, coverUrl)
    return new Response(coverUrl)
  }
  return new Response(null)
}

serve(handleRequest, {
  port: Number(Deno.env.get('PORT')) || 8000
});