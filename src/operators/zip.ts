import { Operator as Op } from '../core/types'
import { Zip as staticZip, ZipStrict as staticZipStrict } from '../static/zip'
import { It, Un } from '../utils/types'


export function zip<T> (): Op<T, [T]>
export function zip<T, A> (itA: It<A>): Op<T, [Un<T>, Un<A>]>
export function zip<T, A, B> (itA: It<A>, itB: It<B>): Op<T, [Un<T>, Un<A>, Un<B>]>
export function zip<T, A, B, C> (itA: It<A>, itB: It<B>, itC: It<C>): Op<T, [Un<T>, Un<A>, Un<B>, Un<C>]>
export function zip<T, A, B, C, D> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
): Op<T, [Un<T>, Un<A>, Un<B>, Un<C>, Un<D>]>
export function zip<T, A, B, C, D, E> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
): Op<T, [Un<T>, Un<A>, Un<B>, Un<C>, Un<D>, Un<E>]>
export function zip<T, A, B, C, D, E, F> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
): Op<T, [Un<T>, Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>]>
export function zip<T, A, B, C, D, E, F, G> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
): Op<T, [Un<T>, Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>]>
export function zip<T, A, B, C, D, E, F, G, H> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
): Op<T, [Un<T>, Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>]>
export function zip<T, A, B, C, D, E, F, G, H, I> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
  itI: It<I>,
): Op<T, [Un<T>, Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>, Un<I>]>
export function zip<T, A, B, C, D, E, F, G, H, I, J> (
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
): Op<T, [Un<T>, Un<A>, Un<B>, Un<C>, Un<D>, Un<E>, Un<F>, Un<G>, Un<H>, Un<I>, Un<J>]>
export function zip (...otherIterables: Array<It<unknown>>): Op<unknown, unknown>
export function zip (...otherIterables: Array<It<unknown>>): Op<unknown, Array<unknown>> {
  return function (iterable: It<unknown>): It<Array<unknown>> {
    const iterables = [iterable, ...otherIterables]
    return staticZip(...iterables)
  }
}


export function zipStrict<T> (): Op<T, [T]>
export function zipStrict<T, A> (itA: It<A>): Op<T, [T, A]>
export function zipStrict<T, A, B> (itA: It<A>, itB: It<B>): Op<T, [T, A, B]>
export function zipStrict<T, A, B, C> (itA: It<A>, itB: It<B>, itC: It<C>): Op<T, [T, A, B, C]>
export function zipStrict<T, A, B, C, D> (itA: It<A>, itB: It<B>, itC: It<C>, itD: It<D>): Op<T, [T, A, B, C, D]>
export function zipStrict<T, A, B, C, D, E> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
): Op<T, [T, A, B, C, D, E]>
export function zipStrict<T, A, B, C, D, E, F> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
): Op<T, [T, A, B, C, D, E, F]>
export function zipStrict<T, A, B, C, D, E, F, G> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
): Op<T, [T, A, B, C, D, E, F, G]>
export function zipStrict<T, A, B, C, D, E, F, G, H> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
): Op<T, [T, A, B, C, D, E, F, G, H]>
export function zipStrict<T, A, B, C, D, E, F, G, H, I> (
  itA: It<A>,
  itB: It<B>,
  itC: It<C>,
  itD: It<D>,
  itE: It<E>,
  itF: It<F>,
  itG: It<G>,
  itH: It<H>,
  itI: It<I>,
): Op<T, [T, A, B, C, D, E, F, G, H, I]>
export function zipStrict<T, A, B, C, D, E, F, G, H, I, J> (
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
): Op<T, [T, A, B, C, D, E, F, G, H, I, J]>
export function zipStrict (...otherIterables: Array<It<unknown>>): Op<unknown, unknown>
export function zipStrict (...otherIterables: Array<It<unknown>>): Op<unknown, unknown> {
  return function (iterable: It<unknown>): It<Array<unknown>> {
    const iterables = [iterable, ...otherIterables]
    return staticZipStrict(...iterables)
  }
}
