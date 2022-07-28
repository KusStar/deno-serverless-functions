# Markdown to HTML API

https://md2html.deno.dev

Use https://deno.land/x/markdown@v2.0.0 and https://highlightjs.org

Source in https://github.com/KusStar/deno-serverless-functions

## Usage

```js
const api = "https://md2html.deno.dev"

const md = '# Hello world ## H2 ### H3'
const res = await fetch(api, {
  method: 'POST',
  body: md
})

const htmlString = res.text()
console.log(htmlString)
```
