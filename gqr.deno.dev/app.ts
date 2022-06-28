import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { qrcode } from "https://deno.land/x/qrcode@v2.0.0/mod.ts";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts"

const SLICE_START = 22

serve(async (req: Request) => {
  const url = new URL(req.url)
  const text = url.searchParams.get('text') || 'Hello World'
  const size = Number(url.searchParams.get('size')) || 256
  const image = String(await qrcode(text, {
    size
  }))
  return new Response(base64.toUint8Array(image.slice(SLICE_START)))
})
