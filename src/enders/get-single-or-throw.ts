import { Ender } from '../core/types'
import { getSingleOrThrow as staticGetSingleOrThrow } from '../static/get-single-or-throw'

export function getSingleOrThrow<T> (): Ender<T, T> {
  return staticGetSingleOrThrow
}
