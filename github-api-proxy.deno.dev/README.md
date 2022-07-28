# GitHub API Proxy

<https://github-api-proxy.deno.dev>

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
