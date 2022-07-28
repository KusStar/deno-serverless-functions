import * as path from "https://deno.land/std@0.149.0/path/mod.ts";

export { path }

export const rootDir = new URL('.', import.meta.url).pathname;

