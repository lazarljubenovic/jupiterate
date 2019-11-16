export function size (iterable: Iterable<unknown>): number {
  let count = 0
  for (const item of iterable) {
    count++
  }
  return count
}
