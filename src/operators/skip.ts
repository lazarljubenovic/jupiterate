import { compose } from '../core'
import { skipUntil } from './skip-until'

export const skip = (count: number) => compose(
  skipUntil((_, i) => i >= count),
)
