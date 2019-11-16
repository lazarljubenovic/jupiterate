import { intersection } from './intersection'
import { size } from './size'

export function areDisjoint(...iterables: Array<Iterable<unknown>>): boolean {
  return size(intersection(...iterables)) == 0
}
