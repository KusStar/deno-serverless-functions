# Markdown to HTML API

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KusStar/deno-serverless-functions/tree/main/md2html.deno.dev)

<https://md2html.deno.dev>

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
