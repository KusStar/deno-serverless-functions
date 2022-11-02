export const getAlbumCover = async (id: string) => {
  const url = `https://music.163.com/api/v3/song/detail?c=[{"id": ${id}}]`
  const res = await fetch(url)
  const data = await res.json()
  return data.songs[0].al.picUrl
}

export const parse163music = (source: string) => {
  const id = new URLSearchParams(source.split('?')[1]).get('id')

  if (id) {
    return getAlbumCover(id)
  }

  return null
}