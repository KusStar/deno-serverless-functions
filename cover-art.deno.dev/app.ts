import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { fetchReadmeToHtml } from '../utils.ts';
import { parseBilibili } from './parsers/bilibili.ts'
import { parse163music } from './parsers/163music.ts';

const getCoverUrl = (source: string) => {
  const url = new URL(source)
  if (url.host.includes('bilibili.com') || url.host.includes('b23.tv')) {
    return parseBilibili(source)
  } else if (url.host.includes('music.163.com')) {
    return parse163music(source)
  }
  return null
}

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