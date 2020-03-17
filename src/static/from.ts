export function* from<T> (item: Iterable<T>): Iterable<T> {
  yield* item
}
