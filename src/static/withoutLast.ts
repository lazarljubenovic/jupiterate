export function* withoutLast<T> (iterable: Iterable<T>): Iterable<T> {
  let previousItem: T | undefined = undefined
  for (const item of iterable) {
    if (previousItem != null) yield previousItem
    previousItem = item
  }
}
