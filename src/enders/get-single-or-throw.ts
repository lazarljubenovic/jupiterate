import { Ender } from '../core/types'
import { geSingleOrThrow as staticGetSingleOrThrow } from '../static/ge-single-or-throw'

export function getSingleOrThrow<T> (): Ender<T, T> {
  return staticGetSingleOrThrow
}
