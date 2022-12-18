export function *JoinWith<T, U> (joiner: U, iterable: Iterable<T>): IterableIterator<T | U> {
  let isFirst: boolean = true
  for (const item of iterable) {
    if (!isFirst) yield joiner
    isFirst = false
    yield item
  }
}
