import { parseBilibili } from './bilibili.ts'
import { parse163music } from './163music.ts';
import { parseQQmusic } from './qqmusic.ts';

export const getCoverUrl = (source: string) => {
  const { host } = new URL(source)
  if (host.includes('bilibili.com') || host.includes('b23.tv')) {
    return parseBilibili(source)
  } else if (host.includes('music.163.com')) {
    return parse163music(source)
  } else if (host.includes('y.qq.com')) {
    return parseQQmusic(source)
  }
  return null
}