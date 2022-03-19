export function *join<T> (...iterables: Array<Iterable<T>>): Iterable<T> {
  for (const iterable of iterables) {
    yield *iterable
  }
}
