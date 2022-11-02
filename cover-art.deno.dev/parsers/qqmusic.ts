const getSongMid = async (source: string) => {
  if (source.includes('songDetail')) {
    return source.split('/').slice(-1)[0]
  }
  if (source.includes('base')) {
    const res = await fetch(source)
    if (res.url && res.url.includes('songmid')) {
      return new URL(res.url).searchParams.get('songmid')
    }
  }
}

export const parseQQmusic = async (source: string) => {
  const songmid = await getSongMid(source)
  const res = await fetch('http://u.y.qq.com/cgi-bin/musicu.fcg', {
    method: 'POST',
    body: JSON.stringify({
      songinfo: {
        method: 'get_song_detail_yqq',
        module: 'music.pf_song_detail_svr',
        param: {
          song_mid: songmid,
        },
      },
    })
  })
  const { songinfo: { data: { track_info: { album } } }} = await res.json()
  const img = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${album.mid}.jpg`
  return img
}