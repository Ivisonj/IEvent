export const formateName = (completeName: string) => {
  const parts = completeName.split(' ')
  const firstTwoParts = parts.slice(0, 2)
  return firstTwoParts.join(' ')
}
