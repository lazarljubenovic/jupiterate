import { empty } from './empty'

export function intersection (...iterables: Array<Iterable<unknown>>): Iterable<unknown> {
  if (iterables.length == 0) return empty()
  const result = new Set<unknown>()
  for (const iterable of iterables) {
    for (const item of iterable) {
      result.add(item)
    }
  }
  return result
}
