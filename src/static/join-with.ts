export function *joinWith<T, U> (joiner: U, iterable: Iterable<T>): Iterable<T | U> {
  let isFirst: boolean = true
  for (const item of iterable) {
    if (!isFirst) yield joiner
    isFirst = false
    yield item
  }
}
