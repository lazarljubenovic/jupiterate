import { compose } from '../core'
import { skipUntil } from './skip-until'

export const skip = (count: number) => compose(
  skipUntil((_, i) => i >= count),
)

export const skip1 = skip(1)
export const skip2 = skip(2)
export const skip3 = skip(3)
