import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { path, dirname } from '../utils.ts';
import { toHTML } from './render.ts';

const README_PATH = path.join(dirname(import.meta.url), './README.md')

const RES_OPTIONS = {
  headers: {
    'Content-Type': 'text/html',
  }
}

async function handleRequest(request: Request) {
  if (!request.body) {
    const md = await Deno.readTextFile(README_PATH)
    return new Response(toHTML(md), RES_OPTIONS);
  }
  const md = await request.text();

  return new Response(toHTML(md), RES_OPTIONS)
}

serve(handleRequest, {
  port: Number(Deno.env.get('PORT')) || 8000
});