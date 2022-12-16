import { identity } from '../utils'
import { Unary } from './types'

export function compose (): <T>(t: T) => T

export function compose<A, R> (
  fn1: Unary<A, R>,
): Unary<A, R>

export function compose<A, B, R> (
  fn1: Unary<A, B>,
  fn2: Unary<B, R>,
): Unary<A, R>

export function compose<A, B, C, R> (
  fn1: Unary<A, B>,
  fn2: Unary<B, C>,
  fn3: Unary<C, R>,
): Unary<A, R>

export function compose<A, B, C, D, R> (
  fn1: Unary<A, B>,
  fn2: Unary<B, C>,
  fn3: Unary<C, D>,
  fn4: Unary<D, R>,
): Unary<A, R>

export function compose (...fns: Array<Unary<any, any>>): Unary<any, any> {
  return fns.reduce((acc, curr) => (arg) => curr(acc(arg)), identity)
}
