export function *Just<T> (item: T): IterableIterator<T> {
  yield item
}
