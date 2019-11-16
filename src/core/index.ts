import { Ender, Operator as Op, Operator, Unary } from './types'
import { identity } from '../utils'

export function pipe<R> (iterable: Iterable<R>): Iterable<R>
export function pipe<A, R> (iterable: Iterable<A>, operator1: Operator<A, R>): Iterable<R>
export function pipe<A, R> (iterable: Iterable<A>, ender: Ender<A, R>): R
export function pipe<A, B, R> (iterable: Iterable<A>, operator1: Operator<A, B>, operator2: Operator<B, R>): Iterable<R>
export function pipe<A, B, R> (iterable: Iterable<A>, operator1: Operator<A, B>, ender: Ender<B, R>): R
export function pipe<A, B, C, R> (iterable: Iterable<A>, operator1: Operator<A, B>, operator2: Operator<B, C>, operator3: Operator<C, R>): Iterable<R>
// export function pipe<A, R> (iterable: Iterable<A>, operators: [Op<A, R>]): Iterable<R>
// export function pipe<A, B, R> (iterable: Iterable<A>, operators: [Op<A, B>, Op<B, R>]): Iterable<R>
// export function pipe<A, B, C, R> (iterable: Iterable<A>, operators: [Op<A, B>, Op<B, C>, Op<C, R>]): Iterable<R>
export function pipe<T, R> (
  iterable: Iterable<T>,
  ...operators: Array<Op<any, any>>
  // car?: Op<any, any> | Array<Op<any, any>>,
  // ...cdr: Array<Op<any, any>>
): Iterable<R> {
  const operator = (compose as any)(...operators)
  return operator(iterable)
}

export function compose<R> (): Unary<R, R>
export function compose<A, R> (fn1: Unary<A, R>): Unary<A, R>
export function compose<A, B, R> (fn1: Unary<A, B>, fn2: Unary<B, R>): Unary<A, R>
export function compose<A, B, C, R> (fn1: Unary<A, B>, fn2: Unary<B, C>, fn3: Unary<C, R>): Unary<A, R>
export function compose<A, B, C, D, R> (fn1: Unary<A, B>, fn2: Unary<B, C>, fn3: Unary<C, D>, fn4: Unary<D, R>): Unary<A, R>
export function compose (...fns: Array<Unary<any, any>>): Unary<any, any> {
  return fns.reduce((acc, curr) => (arg) => curr(acc(arg)), identity)
}
