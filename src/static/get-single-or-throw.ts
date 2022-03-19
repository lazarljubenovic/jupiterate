export function getSingleOrThrow<T> (iterable: Iterable<T>): T {
  let theOnlyItem: T
  let count: number = 0
  for (const item of iterable) {
    theOnlyItem = item
    count++
    if (count > 1) {
      throw new Error(`Expected only one item, but found more than one.`)
    }
  }
  if (count == 0) {
    throw new Error(`Expected exactly one item, but got zero.`)
  }
  return theOnlyItem!
}
