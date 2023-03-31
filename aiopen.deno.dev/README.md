# OpenAI API Proxy

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KusStar/deno-serverless-functions/tree/main/aiopen.deno.dev)

<https://aiopen.deno.dev>

## Usage

```js
const completion = await fetch('https://aiopen.deno.dev/v1/chat/completions', {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
  method: 'POST',
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        content: 'Hello',
        role: 'user'
      }
    ],
    temperature: 0.6,
    stream: false,
  }),
})
// More on https://platform.openai.com/docs
```
