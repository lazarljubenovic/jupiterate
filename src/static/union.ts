import { empty } from './empty'
import { join } from './join'
import { pipe } from '../core'
import { unique } from '../operators'

export function union (...iterables: Array<Iterable<unknown>>): Iterable<unknown> {
  if (iterables.length == 0) return empty()
  return pipe(join(iterables), unique())
}
