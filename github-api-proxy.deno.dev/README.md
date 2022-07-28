# GitHub API Proxy

<https://github-api-proxy.deno.dev>

Source in <https://github.com/KusStar/deno-serverless-functions>

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
