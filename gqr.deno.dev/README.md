# Get QRCode API

https://gqr.deno.dev

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KusStar/deno-serverless-functions/tree/main/gqr.deno.dev)

## Usage

```js
const api = "https://gqr.deno.dev"

const text = "Hello World"
const size = 256

const res = await fetch(`${api}?text=${text}&size=${size}`, {
})
```
