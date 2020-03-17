export function geSingleOrThrow<T> (iterable: Iterable<T>): T {
  let theOnlyItem: T | undefined = undefined
  for (const item of iterable) {
    if (theOnlyItem != null) {
      throw new Error(`Expected only one item.`)
    }
    theOnlyItem = item
  }
  if (theOnlyItem == null) {
    throw new Error(`Expected exactly one item, but got zero.`)
  }
  return theOnlyItem
}
