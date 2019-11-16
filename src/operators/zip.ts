import { Operator } from '../core/types'

export function zip<T> (): Operator<T, [T]>
export function zip<T, A> (otherIterable1: Iterable<A>): Operator<T, [T | undefined, A | undefined]>
export function zip<T, A, B> (otherIterable1: Iterable<A>, otherIterable2: Iterable<B>): Operator<T, [T | undefined, A | undefined, B | undefined]>
export function zip<T, A, B, C> (otherIterable1: Iterable<A>, otherIterable2: Iterable<B>, otherIterable3: Iterable<C>): Operator<T, [T | undefined, A | undefined, B | undefined, C | undefined]>
export function zip<T, A, B, C, D> (otherIterable1: Iterable<A>, otherIterable2: Iterable<B>, otherIterable3: Iterable<C>, otherIterable4: Iterable<D>): Operator<T, [T | undefined, A | undefined, B | undefined, C | undefined, D | undefined]>
export function zip<T> (...otherIterables: Array<Iterable<any>>): Operator<T, Array<any>> {
  return function (iterable: Iterable<T>): Iterable<Array<any>> {
    const iterables = [iterable, ...otherIterables]
    const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
    return {
      [Symbol.iterator] (): Iterator<Array<any>> {
        return {
          next (): IteratorResult<Array<any>> {
            const results = iterators.map(iterator => iterator.next())
            const areAllDone = results.every(result => result.done)
            if (areAllDone) {
              return { done: true, value: undefined }
            } else {
              return { done: false, value: results.map(result => result.value) }
            }
          },
        }
      },
    }
  }
}

function throwError () {
  throw new Error(`All iterables given to zipStrict must be of the same length.`)
}

export function zipStrict<T> (): Operator<T, [T]>
export function zipStrict<T, A> (otherIterable1: Iterable<A>): Operator<T, [T, A]>
export function zipStrict<T, A, B> (otherIterable1: Iterable<A>, otherIterable2: Iterable<B>): Operator<T, [T, A, B]>
export function zipStrict<T, A, B, C> (otherIterable1: Iterable<A>, otherIterable2: Iterable<B>, otherIterable3: Iterable<C>): Operator<T, [T, A, B, C]>
export function zipStrict<T, A, B, C, D> (otherIterable1: Iterable<A>, otherIterable2: Iterable<B>, otherIterable3: Iterable<C>, otherIterable4: Iterable<D>): Operator<T, [T, A, B, C, D]>
export function zipStrict<T> (...otherIterables: Array<Iterable<any>>): Operator<T, any> {
  return function (iterable: Iterable<T>): Iterable<Array<any>> {
    const iterables = [iterable, ...otherIterables]
    const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
    return {
      [Symbol.iterator] (): Iterator<Array<any>> {
        return {
          next (): IteratorResult<Array<any>> {
            let hadOneNotDone = false
            let hadOneDone = false
            const values: Array<any> = []
            for (const iterator of iterators) {
              const result = iterator.next()
              if (result.done) {
                if (hadOneNotDone) throwError()
                hadOneDone = true
              } else {
                if (hadOneDone) throwError()
                hadOneNotDone = true
                values.push(result.value)
              }
            }
            if (hadOneDone) {
              return { done: true, value: undefined }
            } else {
              return { done: false, value: values }
            }
          },
        }
      },
    }
  }
}
