import { Finalizer, Operator as Op } from './types'
import { isIterable } from '../utils'
import { compose } from './compose'


export function pipe<A, R> (
  iterable: Iterable<A>,
  finalizer: Finalizer<A, R>,
): R
export function pipe<A, B, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  finalizer: Finalizer<B, R>,
): R
export function pipe<A, B, C, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  finalizer: Finalizer<C, R>,
): R
export function pipe<A, B, C, D, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  finalizer: Finalizer<D, R>,
): R
export function pipe<A, B, C, D, E, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  finalizer: Finalizer<E, R>,
): R
export function pipe<A, B, C, D, E, F, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  finalizer: Finalizer<F, R>,
): R
export function pipe<A, B, C, D, E, F, G, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, G>,
  finalizer: Finalizer<G, R>,
): R
export function pipe<A, B, C, D, E, F, G, H, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, G>,
  operatorG: Op<G, H>,
  finalizer: Finalizer<H, R>,
): R
export function pipe<A, B, C, D, E, F, G, H, I, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, G>,
  operatorG: Op<G, H>,
  operatorH: Op<H, I>,
  finalizer: Finalizer<I, R>,
): R
export function pipe<A, B, C, D, E, F, G, H, I, J, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, G>,
  operatorG: Op<G, H>,
  operatorH: Op<H, R>,
  operatorI: Op<I, J>,
  finalizer: Finalizer<J, R>,
): R
export function pipe<R> (
  iterable: Iterable<R>,
): Iterable<R>
export function pipe<A, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, R>,
): Iterable<R>
export function pipe<A, B, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, R>,
): Iterable<R>
export function pipe<A, B, C, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, R>,
): Iterable<R>
export function pipe<A, B, C, D, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, R>,
): Iterable<R>
export function pipe<A, B, C, D, E, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, R>,
): Iterable<R>
export function pipe<A, B, C, D, E, F, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, R>,
): Iterable<R>
export function pipe<A, B, C, D, E, F, G, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, G>,
  operatorG: Op<G, R>,
): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, G>,
  operatorG: Op<G, H>,
  operatorH: Op<H, R>,
): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, I, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, G>,
  operatorG: Op<G, H>,
  operatorH: Op<H, I>,
  operatorI: Op<I, R>,
): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, I, J, R> (
  iterable: Iterable<A>,
  operatorA: Op<A, B>,
  operatorB: Op<B, C>,
  operatorC: Op<C, D>,
  operatorD: Op<D, E>,
  operatorE: Op<E, F>,
  operatorF: Op<F, G>,
  operatorG: Op<G, H>,
  operatorH: Op<H, R>,
  operatorI: Op<I, J>,
  operatorj: Op<J, R>,
): Iterable<R>
export function pipe<A, R> (iterable: Iterable<A>, operators: [Finalizer<A, R>]): R
export function pipe<A, B, R> (iterable: Iterable<A>, operators: [Op<A, B>, Finalizer<B, R>]): R
export function pipe<A, B, C, R> (iterable: Iterable<A>, operators: [Op<A, B>, Op<B, C>, Finalizer<C, R>]): R
export function pipe<A, B, C, D, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Finalizer<D, R>],
): R
export function pipe<A, B, C, D, E, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Finalizer<E, R>],
): R
export function pipe<A, B, C, D, E, F, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Finalizer<F, R>],
): R
export function pipe<A, B, C, D, E, F, G, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Finalizer<G, R>],
): R
export function pipe<A, B, C, D, E, F, G, H, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Finalizer<H, R>],
): R
export function pipe<A, B, C, D, E, F, G, H, I, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, I>, Finalizer<I, R>],
): R
export function pipe<A, B, C, D, E, F, G, H, I, J, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, R>, Op<I, J>, Finalizer<J, R>],
): R
export function pipe<R> (iterable: Iterable<R>, operators: []): Iterable<R>
export function pipe<A, R> (iterable: Iterable<A>, operators: [Op<A, R>]): Iterable<R>
export function pipe<A, B, R> (iterable: Iterable<A>, operators: [Op<A, B>, Op<B, R>]): Iterable<R>
export function pipe<A, B, C, R> (iterable: Iterable<A>, operators: [Op<A, B>, Op<B, C>, Op<C, R>]): Iterable<R>
export function pipe<A, B, C, D, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, R>],
): Iterable<R>
export function pipe<A, B, C, D, E, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, R>],
): Iterable<R>
export function pipe<A, B, C, D, E, F, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, R>],
): Iterable<R>
export function pipe<A, B, C, D, E, F, G, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, R>],
): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, R>],
): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, I, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, I>, Op<I, R>],
): Iterable<R>
export function pipe<A, B, C, D, E, F, G, H, I, J, R> (
  iterable: Iterable<A>,
  operators: [Op<A, B>, Op<B, C>, Op<C, D>, Op<D, E>, Op<E, F>, Op<F, G>, Op<G, H>, Op<H, R>, Op<I, J>, Op<J, R>],
): Iterable<R>
export function pipe (
  iterable: Iterable<any>,
  car?: Op<any, any> | Iterable<Op<any, any>>,
  ...cdr: Array<Op<any, any>>
): Iterable<any> {
  const operators: Iterable<Op<any, any>> = car == null ? [] : isIterable(car) ? car : [car, ...cdr]
  const operator = (compose as any)(...operators)
  return operator(iterable)
}
