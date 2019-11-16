import { Operator } from '../core/types'
import { joinWith as staticJoinWith } from '../static/joinWith'

export function join<T, U> (joiner: U): Operator<T, T | U> {
  return function (iterable: Iterable<T>): Iterable<T | U> {
    return staticJoinWith(joiner, iterable)
  }
}
