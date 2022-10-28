import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { fetchReadmeToHtml } from '../utils.ts';
import { parseBilibili } from './parsers/bilibili.ts'

const getCoverUrl = (source: string) => {
  const url = new URL(source)
  if (url.host.includes('bilibili.com') || url.host.includes('b23.tv')) {
    return parseBilibili(source)
  }
  return null
}

async function handleRequest(request: Request) {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    const res = await fetchReadmeToHtml(import.meta.url)
    return res;
  }
  if (url.pathname === '/favicon.ico') {
    return new Response(null)
  }
  const target = decodeURIComponent(url.pathname).slice(1)
  const coverUrl = await getCoverUrl(target)
  return new Response(coverUrl)
}

serve(handleRequest, {
  port: Number(Deno.env.get('PORT')) || 8000
});