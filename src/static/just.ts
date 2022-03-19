export function *just<T> (item: T): Iterable<T> {
  yield item
}
