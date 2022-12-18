export function Reduce<T, U> (iterable: Iterable<T>, reducer: (result: U, item: T, index: number) => U, seed: U): U
export function Reduce<T> (iterable: Iterable<T>, reducer: (result: T, item: T, index: number) => T, seed?: T): T
export function Reduce<T> (iterable: Iterable<T>, reducer: (result: T, item: any, index: number) => any, seed?: any): any {
  if (arguments.length == 2) {
    // No seed, so we must find it ourselves.
    const iterator = iterable[Symbol.iterator]()
    const seed = iterator.next()
    if (seed.done) {
      throw new Error(`No seed given and no items yielded from the iterable.`)
    }
    let index = 1
    let result = seed.value
    while (true) {
      const next = iterator.next()
      if (next.done) {
        break
      }
      result = reducer(result, next.value, index++)
    }
    return result
  } else if (arguments.length == 3) {
    // Seed exists, so things are way more consistent between iterations.
    let index = 0
    let result = seed
    for (const item of iterable) {
      result = reducer(result, item, index++)
    }
    return result
  } else {
    throw new Error(`Unknown “reduce” signature. Please use TypeScript.`)
  }
}
