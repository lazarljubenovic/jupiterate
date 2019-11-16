import { Ender } from '../core/types'
import { getSingleOrThrow as staticGetSingleOrThrow } from '../static/getSingleOrThrow'

export function getSingleOrThrow<T> (): Ender<T, T> {
  return staticGetSingleOrThrow
}
