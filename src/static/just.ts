export function *Just<T> (item: T): Iterable<T> {
  yield item
}
