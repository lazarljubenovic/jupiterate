export function *WithoutLast<T> (iterable: Iterable<T>): IterableIterator<T> {
  let previousItem: T | undefined = undefined
  for (const item of iterable) {
    if (previousItem != null) yield previousItem
    previousItem = item
  }
}
