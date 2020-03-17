import { size } from './size'
import { intersection } from './intersection'

export function areDisjoint (...iterables: Array<Iterable<unknown>>): boolean {
  return size(intersection(...iterables)) == 0
}
