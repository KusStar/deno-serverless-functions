# GitHub API Proxy

<https://github-api-proxy.deno.dev>

[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KusStar/deno-serverless-functions/tree/main/github-api-proxy.deno.dev)

## Usage

```diff
- https://api.github.com
+ https://github-api-proxy.deno.dev
```

### Octokit

```js
const octokit = new Octokit({
  baseUrl: "https://github-api-proxy.deno.dev/",
});
```
