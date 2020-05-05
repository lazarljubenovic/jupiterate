import { Ender, Operator as Op } from './types'
import { isIterable } from '../utils'
import { compose } from './compose'

export function pipe<A, R> (it: Iterable<A>, e: Ender<A, R>): R
export function pipe<A, B, R> (it: Iterable<A>, opA: Op<A, B>, e: Ender<B, R>): R
export function pipe<A, B, C, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, e: Ender<C, R>): R
export function pipe<A, B, C, D, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, e: Ender<D, R>): R
export function pipe<A, B, C, D, E, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, e: Ender<E, R>): R
export function pipe<A, B, C, D, E, F, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, e: Ender<F, R>): R
export function pipe<A, B, C, D, E, F, G, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, G>, e: Ender<G, R>): R
export function pipe<A, B, C, D, E, F, G, H, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, G>, opG: Op<G, H>, e: Ender<H, R>): R
export function pipe<A, B, C, D, E, F, G, H, I, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, G>, opG: Op<G, H>, opH: Op<H, I>, e: Ender<I, R>): R
export function pipe<A, B, C, D, E, F, G, H, I, J, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, G>, opG: Op<G, H>, opH: Op<H, R>, opI: Op<I, J>, e: Ender<J, R>): R
export function pipe<R> (it: Iterable<R>): Iterable<R>
export function pipe<A, R> (it: Iterable<A>, opA: Op<A, R>): Iterable<R>
export function pipe<A, B, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, R>): Iterable<R>
export function pipe<A, B, C, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, R>): Iterable<R>
export function pipe<A, B, C, D, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, R>): Iterable<R>
export function pipe<A, B, C, D, E, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, R>): Iterable<R>
export function pipe<A, B, C, D, E, F, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, R>): Iterable<R>
export function pipe<A, B, C, D, E, F, G, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, G>, opG: Op<G, R>): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, G>, opG: Op<G, H>, opH: Op<H, R>): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, I, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, G>, opG: Op<G, H>, opH: Op<H, I>, opI: Op<I, R>): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, I, J, R> (it: Iterable<A>, opA: Op<A, B>, opB: Op<B, C>, opC: Op<C, D>, opD: Op<D, E>, opE: Op<E, F>, opF: Op<F, G>, opG: Op<G, H>, opH: Op<H, R>, opI: Op<I, J>, opj: Op<J, R>): Iterable<R>
export function pipe<A, R> (it: Iterable<A>, ops: [Ender<A, R>]): R
export function pipe<A, B, R> (it: Iterable<A>, ops: [Op<A, B>, Ender<B, R>]): R
export function pipe<A, B, C, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Ender<C, R>]): R
export function pipe<A, B, C, D, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Ender<D, R>]): R
export function pipe<A, B, C, D, E, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Ender<E, R>]): R
export function pipe<A, B, C, D, E, F, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Ender<F, R>]): R
export function pipe<A, B, C, D, E, F, G, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Ender<G, R>]): R
export function pipe<A, B, C, D, E, F, G, H, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Ender<H, R>]): R
export function pipe<A, B, C, D, E, F, G, H, I, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, I>, Ender<I, R>]): R
export function pipe<A, B, C, D, E, F, G, H, I, J, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, R>, Op<I, J>, Ender<J, R>]): R
export function pipe<R> (it: Iterable<R>, ops: []): Iterable<R>
export function pipe<A, R> (it: Iterable<A>, ops: [Op<A, R>]): Iterable<R>
export function pipe<A, B, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, R>]): Iterable<R>
export function pipe<A, B, C, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, R>]): Iterable<R>
export function pipe<A, B, C, D, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, R>]): Iterable<R>
export function pipe<A, B, C, D, E, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, R>]): Iterable<R>
export function pipe<A, B, C, D, E, F, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, R>]): Iterable<R>
export function pipe<A, B, C, D, E, F, G, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, R>]): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, R>]): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, I, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, I>, Op<I, R>]): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, I, J, R> (it: Iterable<A>, ops: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, R>, Op<I, J>, Op<J, R>]): Iterable<R>
export function pipe (
  iterable: Iterable<any>,
  car?: Op<any, any> | Iterable<Op<any, any>>,
  ...cdr: Array<Op<any, any>>
): Iterable<any> {
  const operators: Iterable<Op<any, any>> = car == null ? [] : isIterable(car) ? car : [car, ...cdr]
  const operator = (compose as any)(...operators)
  return operator(iterable)
}
