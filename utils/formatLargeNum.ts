export const formatLargeNum = (num: number) => {
  if (num > 999 && num < 1000000) {
    return `${(num / 1000).toFixed(2)}K`
  } else if (num >= 1000000 && num < 1000000000) {
    return `${(num / 1000000).toFixed(2)}M`
  } else if (num > 1000000000 && num < 1000000000000) {
    return `${(num / 1000000000).toFixed(2)}B`
  } else if (num > 1000000000000) {
    return `${(num / 1000000000000).toFixed(2)}T`
  } else if (num < 900) {
    return num.toFixed(3)
  }
  return num
}
