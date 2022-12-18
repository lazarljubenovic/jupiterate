import { pipe } from '../core'
import { unique } from '../operators'
import { Empty } from '../static'
import { Concat } from './concat'


export function Union<T> (...iterables: Array<Iterable<T>>): IterableIterator<T> {
  if (iterables.length == 0) return Empty()
  return pipe(Concat(...iterables), unique())
}
