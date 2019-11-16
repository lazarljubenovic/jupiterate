type It<T> = Iterable<T>
type Un<T> = T | undefined

/**
 * @short
 * Yields tuples of several iterators in parallel, as if *zipping* values together.
 *
 * @categories
 * static
 *
 * @description
 * The first yielded value of all given iterables are yielded as a single tuple from the
 * resulting iterable. The same happens for the second, third, etc. This happens as long
 * as at least one iterable has values to yield. `undefined` will be used for missing
 * values.
 *
 * To ensure all iterables are of same size (at runtime), use {@link zipStrict}.
 *
 * @since
 * 0.0.1
 *
 * @parameter
 * ...iterables
 * Iterable[]
 * Iterables to zip together.
 *
 * @returns
 * Operator<T, [...U]>
 *
 * @example
 * j.s.zip(
 *   [1, 2, 3],
 *   [a, b, c],
 *   [A, B, C, D],
 * )
 * // => [
 *   [1, a, A],
 *   [2, b, B],
 *   [3, c, C],
 *   [undefined, undefined, D],
 * ]
 */
export function zip (): []
export function zip<A> (itA: It<A>): It<[Un<A>]>
export function zip<A, B> (itA: It<A>, itB: It<B>): It<[Un<A>, Un<B>]>
export function zip<A, B, C> (itA: It<A>, itB: It<B>, itC: It<C>): It<[Un<A>, Un<B>, Un<C>]>
export function zip<A, B, C, D> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>): It<[Un<A>, Un<B>, Un<C>, Un<D>]>
export function zip<A, B, C, D, E> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>): It<[Un<A>, Un<B>, Un<C>, Un<D>, Un<E>]>
export function zip<A, B, C, D, E, F> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>): It<[Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>]>
export function zip<A, B, C, D, E, F, G> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>): It<[Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>]>
export function zip<A, B, C, D, E, F, G, H> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>): It<[Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>]>
export function zip<A, B, C, D, E, F, G, H, I> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>, itI: It<I>): It<[Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>, Un<I>]>
export function zip<A, B, C, D, E, F, G, H, I, J> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>, itI: It<I>, itJ: It<J>): It<[Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>, Un<I>, Un<J>]>
export function zip (...iterables: Array<It<unknown>>): It<Array<unknown>>
export function zip (...iterables: Array<It<unknown>>): It<Array<unknown>> {
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

export function zipStrict (): []
export function zipStrict<A> (itA: It<A>): It<[A]>
export function zipStrict<A, B> (itA: It<A>, itB: It<B>): It<[A, B]>
export function zipStrict<A, B, C> (itA: It<A>, itB: It<B>, itC: It<C>): It<[A, B, C]>
export function zipStrict<A, B, C, D> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>): It<[A, B, C, D]>
export function zipStrict<A, B, C, D, E> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>): It<[A, B, C, D, E]>
export function zipStrict<A, B, C, D, E, F> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>): It<[A, B, C, D, E, F]>
export function zipStrict<A, B, C, D, E, F, G> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>): It<[A, B, C, D, E, F, G]>
export function zipStrict<A, B, C, D, E, F, G, H> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>): It<[A, B, C, D, E, F, G, H]>
export function zipStrict<A, B, C, D, E, F, G, H, I> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>, itI: It<I>): It<[A, B, C, D, E, F, G, H, I]>
export function zipStrict<A, B, C, D, E, F, G, H, I, J> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>, itI: It<I>, itJ: It<J>): It<[A, B, C, D, E, F, G, H, I, J]>
export function zipStrict (...iterables: Array<It<unknown>>): It<Array<unknown>>
export function zipStrict (...iterables: Array<It<unknown>>): It<Array<unknown>> {
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

function throwError () {
  throw new Error(`All iterables given to zipStrict must be of the same length.`)
}
