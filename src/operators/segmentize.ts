import { Operator } from '../core/types'
import { Empty } from '../static'
import { identity } from '../utils'

// TODO: if we let the consumer see index, we're getting a generalization of the chunk operator
export function segmentizeBy<T> (
  project: (item: T) => unknown,
): Operator<T, Array<T>> {

  return function *(iterable: Iterable<T>): IterableIterator<Array<T>> {

    const iterator = iterable[Symbol.iterator]()

    const first = iterator.next()
    if (first.done) {
      yield *Empty()
      return
    }

    let segmentItems = [first.value]
    let anchor = project(first.value)

    while (true) {
      const next = iterator.next()
      if (next.done) {
        break
      }
      const projected = project(next.value)
      if (Object.is(projected, anchor)) {
        segmentItems.push(next.value)
      } else {
        yield segmentItems
        segmentItems = [next.value]
        anchor = projected
      }
    }

    yield segmentItems

    // prevent memory leaks
    segmentItems = null!
    anchor = null!

  }

}

const _segmentize = segmentizeBy(identity)
export function segmentize () {
  return function *<T> (iterable: Iterable<T>): IterableIterator<Array<T>> {
    yield* _segmentize<T>(iterable)
  }
}
