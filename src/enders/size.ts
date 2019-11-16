import { Ender } from '../core/types'
import { size as staticSize } from '../static/size'

export function size (): Ender<unknown, number> {
  return staticSize
}
