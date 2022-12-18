import { Empty } from './empty'


export function *Intersection<T> (...iterables: Array<Iterable<T>>): IterableIterator<T> {
  if (iterables.length == 0) return Empty<T>()
  const inAllIterablesUntilNow = new Set<T>(iterables[0])

  for (const iterable of iterables.slice(1)) {
    const survivors = new Set<T>()
    for (const item of iterable) {
      if (inAllIterablesUntilNow.has(item)) {
        survivors.add(item)
      }
    }
    for (const item of inAllIterablesUntilNow) {
      if (!survivors.has(item)) {
        inAllIterablesUntilNow.delete(item)
      }
    }
  }

  yield *inAllIterablesUntilNow
}
