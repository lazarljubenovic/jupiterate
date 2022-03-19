import { pipe } from '../core'
import { unique } from '../operators'
import { empty } from '../generators'
import { concat } from './concat'


export function union<T> (...iterables: Array<Iterable<T>>): Iterable<T> {
  if (iterables.length == 0) return empty()
  return pipe(concat(...iterables), unique())
}
