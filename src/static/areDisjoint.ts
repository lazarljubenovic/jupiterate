import { union } from './union'
import { size } from './size'

export function areDisjoint(...iterables: Array<Iterable<unknown>>): boolean {
  return size(union(...iterables)) == 0
}
