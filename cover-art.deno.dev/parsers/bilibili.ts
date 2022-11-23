export const RE = /<meta data-vue-meta="true" itemprop="image" content="(?<coverArt>.+?)">/gm

export const parseBilibili = async (source: string) => {
  const res = await fetch(source)
  const text = await res.text()

  const groups = RE.exec(text)?.groups

  if (groups) {
    const url = groups.coverArt.replace('http://', 'https://')
    if (url.includes("https://")) {
      return url
    }
    return 'https:' + url
  }

  return null
}