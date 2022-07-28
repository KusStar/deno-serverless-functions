import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { fetchReadmeToHtml } from './utils.ts';

serve(() => {
  return fetchReadmeToHtml(import.meta.url)
})
