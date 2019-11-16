import { empty } from './empty'

export function intersection<T> (...iterables: Array<Iterable<T>>): Iterable<T> {
  if (iterables.length == 0) return empty<T>()
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

  return inAllIterablesUntilNow
}
