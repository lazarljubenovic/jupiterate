import { Operator as Op, Operator, UnaryMapper } from './types'
import { identity } from '../utils'

const arr = [1,2,3,4,5,6,7,8,9,10,11]

for (const item of arr) {
  const inc = item + 1
  if (inc % 2 == 1) continue

}

export function pipe<R> (iterable: Iterable<R>): Iterable<R>
export function pipe<A, R> (iterable: Iterable<A>, operator1: Operator<A, R>): Iterable<R>
export function pipe<A, B, R> (iterable: Iterable<A>, operator1: Operator<A, B>, operator2: Operator<B, R>): Iterable<R>
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

export function compose<R> (): UnaryMapper<R, R>
export function compose<A, R> (fn1: UnaryMapper<A, R>): UnaryMapper<A, R>
export function compose<A, B, R> (fn1: UnaryMapper<A, B>, fn2: UnaryMapper<B, R>): UnaryMapper<A, R>
export function compose<A, B, C, R> (fn1: UnaryMapper<A, B>, fn2: UnaryMapper<B, C>, fn3: UnaryMapper<C, R>): UnaryMapper<A, R>
export function compose<A, B, C, D, R> (fn1: UnaryMapper<A, B>, fn2: UnaryMapper<B, C>, fn3: UnaryMapper<C, D>, fn4: UnaryMapper<D, R>): UnaryMapper<A, R>
export function compose (...fns: Array<UnaryMapper<any, any>>): UnaryMapper<any, any> {
  return fns.reduce((acc, curr) => (arg) => curr(acc(arg)), identity)
}
