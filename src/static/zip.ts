import { ItIt } from '../utils/types'

type It<T> = Iterable<T>
type Opt<T> = T | undefined

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
 * To ensure all iterables are of the same size (at runtime), use {@link ZipStrict}.
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
 * IterableIterator<[...T]>
 *
 * @example
 * j.Zip(
 *   [1, 2, 3, 4],
 *   [a, b, c, d],
 * )
 * // => [[1, a], [2, b], [3, c], [4, d]]
 *
 * @example
 * j.Zip(
 *   [1, 2, 3],
 *   [a, b],
 *   [A, B, C, D],
 * )
 * // => [
 *   [        1,         a,         A],
 *   [        2,         b,         B],
 *   [        3, undefined,         C],
 *   [undefined, undefined,         D],
 * ]
 */
export function Zip<A> (itA: It<A>): ItIt<[Opt<A>]>
export function Zip<A, B> (itA: It<A>, itB: It<B>): ItIt<[Opt<A>, Opt<B>]>
export function Zip<A, B, C> (itA: It<A>, itB: It<B>, itC: It<C>): ItIt<[Opt<A>, Opt<B>, Opt<C>]>
export function Zip<A, B, C, D> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>): ItIt<[Opt<A>, Opt<B>, Opt<C>, Opt<D>]>
export function Zip<A, B, C, D, E> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
): ItIt<[Opt<A>, Opt<B>, Opt<C>, Opt<D>, Opt<E>]>
export function Zip<A, B, C, D, E, F> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
): ItIt<[Opt<A>, Opt<B>, Opt<C>, Opt<D>, Opt<E>, Opt<F>]>
export function Zip<A, B, C, D, E, F, G> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
): ItIt<[Opt<A>, Opt<B>, Opt<C>, Opt<D>, Opt<E>, Opt<F>, Opt<G>]>
export function Zip<A, B, C, D, E, F, G, H> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
): ItIt<[Opt<A>, Opt<B>, Opt<C>, Opt<D>, Opt<E>, Opt<F>, Opt<G>, Opt<H>]>
export function Zip<A, B, C, D, E, F, G, H, I> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
  itI: It<I>,
): ItIt<[Opt<A>, Opt<B>, Opt<C>, Opt<D>, Opt<E>, Opt<F>, Opt<G>, Opt<H>, Opt<I>]>
export function Zip<A, B, C, D, E, F, G, H, I, J> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
  itI: It<I>,
  itJ: It<J>,
): ItIt<[Opt<A>, Opt<B>, Opt<C>, Opt<D>, Opt<E>, Opt<F>, Opt<G>, Opt<H>, Opt<I>, Opt<J>]>
export function Zip (...iterables: Array<It<unknown>>): ItIt<Array<unknown>>
export function Zip (...iterables: Array<It<unknown>>): ItIt<Array<unknown>> {
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
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
    [Symbol.iterator] () {
      return this
    },
  }
}

export function ZipStrict<A> (itA: It<A>): ItIt<[A]>
export function ZipStrict<A, B> (itA: It<A>, itB: It<B>): ItIt<[A, B]>
export function ZipStrict<A, B, C> (itA: It<A>, itB: It<B>, itC: It<C>): ItIt<[A, B, C]>
export function ZipStrict<A, B, C, D> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>): ItIt<[A, B, C, D]>
export function ZipStrict<A, B, C, D, E> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
): ItIt<[A, B, C, D, E]>
export function ZipStrict<A, B, C, D, E, F> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
): ItIt<[A, B, C, D, E, F]>
export function ZipStrict<A, B, C, D, E, F, G> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
): ItIt<[A, B, C, D, E, F, G]>
export function ZipStrict<A, B, C, D, E, F, G, H> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
): ItIt<[A, B, C, D, E, F, G, H]>
export function ZipStrict<A, B, C, D, E, F, G, H, I> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
  itI: It<I>,
): ItIt<[A, B, C, D, E, F, G, H, I]>
export function ZipStrict<A, B, C, D, E, F, G, H, I, J> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
  itI: It<I>,
  itJ: It<J>,
): ItIt<[A, B, C, D, E, F, G, H, I, J]>
export function ZipStrict (...iterables: Array<It<unknown>>): ItIt<Array<unknown>>
export function ZipStrict (...iterables: Array<It<unknown>>): ItIt<Array<unknown>> {
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
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
    [Symbol.iterator] () {
      return this
    },
  }
}

function throwError () {
  throw new Error(`All iterables given to zipStrict must be of the same length.`)
}
