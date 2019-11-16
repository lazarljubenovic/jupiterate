type It<T> = Iterable<T>
type Un<T> = T | undefined

export function zip (): []
export function zip<A> (itA: It<A>): [Un<A>]
export function zip<A, B> (itA: It<A>, itB: It<B>): [Un<A>, Un<B>]
export function zip<A, B, C> (itA: It<A>, itB: It<B>, itC: It<C>): [Un<A>, Un<B>, Un<C>]
export function zip<A, B, C, D> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>): [Un<A>, Un<B>, Un<C>, Un<D>]
export function zip<A, B, C, D, E> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>): [Un<A>, Un<B>, Un<C>, Un<D>, Un<E>]
export function zip<A, B, C, D, E, F> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>): [Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>]
export function zip<A, B, C, D, E, F, G> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>): [Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>]
export function zip<A, B, C, D, E, F, G, H> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>): [Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>]
export function zip<A, B, C, D, E, F, G, H, I> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>, itI: It<I>): [Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>, Un<I>]
export function zip<A, B, C, D, E, F, G, H, I, J> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>, itI: It<I>, itJ: It<J>): [Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>, Un<I>, Un<J>]
export function zip (...iterables: Array<It<unknown>>): Iterable<Array<unknown>>
export function zip (...iterables: Array<Iterable<unknown>>): Iterable<Array<unknown>> {
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
export function zipStrict<A> (itA: It<A>): [A]
export function zipStrict<A, B> (itA: It<A>, itB: It<B>): [A, B]
export function zipStrict<A, B, C> (itA: It<A>, itB: It<B>, itC: It<C>): [A, B, C]
export function zipStrict<A, B, C, D> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>): [A, B, C, D]
export function zipStrict<A, B, C, D, E> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>): [A, B, C, D, E]
export function zipStrict<A, B, C, D, E, F> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>): [A, B, C, D, E, F]
export function zipStrict<A, B, C, D, E, F, G> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>): [A, B, C, D, E, F, G]
export function zipStrict<A, B, C, D, E, F, G, H> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>): [A, B, C, D, E, F, G, H]
export function zipStrict<A, B, C, D, E, F, G, H, I> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>, itI: It<I>): [A, B, C, D, E, F, G, H, I]
export function zipStrict<A, B, C, D, E, F, G, H, I, J> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>, itE: It<E>, itF: It<F>, itG: It<G>, itH: It<H>, itI: It<I>, itJ: It<J>): [A, B, C, D, E, F, G, H, I, J]
export function zipStrict (...iterables: Array<Iterable<unknown>>): Iterable<Array<unknown>>
export function zipStrict (...iterables: Array<Iterable<unknown>>): Iterable<Array<unknown>> {
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
