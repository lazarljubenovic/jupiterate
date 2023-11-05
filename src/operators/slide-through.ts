import { Operator } from '../core/types'


/**
 * @short
 * Like `pairwise`, but you *slide through* a custom window size.
 *
 * @categories
 * operator
 *
 * @description
 * Processes an iterable by yielding successive overlapping tuples of a specified
 * window size. Each tuple contains `windowSize` consecutive elements from the source
 * iterable. As iteration progresses, the window slides forward by one position,
 * excluding the first element of the previous window and including the next element
 * from the iterable. This operation continues until the source iterable is fully
 * consumed.
 *
 * It follows that the size of the resulting iterable will be the same as the window
 * size, unless the size of the source iterable is less than the window size -- in
 * that case, the resulting iterable is empty.
 *
 * This is a generalization of {@link pairwise}.
 *
 * @since
 * 0.0.4
 *
 * @parameter
 * windowSize
 * number
 * The size of each yielded tuple.
 *
 * @returns
 * Operator<T, Array<T>>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.slideThrough(3),
 * )
 * // => [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.slideThrough(4),
 * )
 * // => []
 */
export function slideThrough<T> (windowSize: 1): Operator<T, [T]>
export function slideThrough<T> (windowSize: 2): Operator<T, [T, T]>
export function slideThrough<T> (windowSize: 3): Operator<T, [T, T, T]>
export function slideThrough<T> (windowSize: 4): Operator<T, [T, T, T, T]>
export function slideThrough<T> (windowSize: 5): Operator<T, [T, T, T, T, T]>
export function slideThrough<T> (windowSize: 6): Operator<T, [T, T, T, T, T, T]>
export function slideThrough<T> (windowSize: 7): Operator<T, [T, T, T, T, T, T, T]>
export function slideThrough<T> (windowSize: 8): Operator<T, [T, T, T, T, T, T, T, T]>
export function slideThrough<T> (windowSize: 9): Operator<T, [T, T, T, T, T, T, T, T, T]>
export function slideThrough<T> (windowSize: 10): Operator<T, [T, T, T, T, T, T, T, T, T, T]>
export function slideThrough<T> (windowSize: number): Operator<T, Array<T>>
export function slideThrough<T> (windowSize: number): Operator<T, Array<T>> {

  if (!Number.isInteger(windowSize) || windowSize < 1) {
    throw new RangeError(`Window size must be an integer not less than 1; an attempt was made to define the window size as ${windowSize}.`)
  }

  return function* (iterable: Iterable<T>): IterableIterator<Array<T>> {
    const window: Array<T> = []
    for (const value of iterable) {
      window.push(value)
      if (window.length == windowSize) {
        yield [...window]
        window.shift()
      }
    }
  }

}

/**
 * @short
 * Like `slideThrough`, but *cyclic*.
 *
 * @categories
 * operator
 *
 * @description
 * Processes an iterable by yielding successive overlapping sub-arrays of a specified
 * window size, similar to `slideThrough`. However, upon fully consuming the source
 * iterable, this operator wraps around to the beginning, continuing the sliding
 * window operation in a cyclic manner. The final sub-arrays combine elements from
 * the end of the iterable with those from the beginning, forming a continuous loop.
 *
 * It follows that the size of the resulting iterable will always be either the size
 * of the source iterable or the window size, whichever is smaller.
 *
 * This is a generalization of {@link pairwiseCyclic}.
 *
 * @since
 * 0.0.4
 *
 * @parameter
 * windowSize
 * number
 * The size of each yielded tuple.
 *
 * @returns
 * Operator<T, Array<T>>
 *
 * @example
 * j.pipe(
 *   [1, 2, 3, 4, 5],
 *   j.slideThrough(3),
 * )
 * // => [
 * //   [1, 2, 3],
 * //   [2, 3, 4],
 * //   [3, 4, 5],
 * //   [4, 5, 1],
 * //   [5, 1, 2],
 * // ]
 *
 * @example
 * j.pipe(
 *   [1, 2, 3],
 *   j.slideThrough(4),
 * )
 * // => [
 * //   [1, 2, 3, 1],
 * //   [2, 3, 1, 2],
 * //   [3, 1, 2, 3],
 * // ]
 */
export function slideThroughCyclic<T> (windowSize: 1): Operator<T, [T]>
export function slideThroughCyclic<T> (windowSize: 2): Operator<T, [T, T]>
export function slideThroughCyclic<T> (windowSize: 3): Operator<T, [T, T, T]>
export function slideThroughCyclic<T> (windowSize: 4): Operator<T, [T, T, T, T]>
export function slideThroughCyclic<T> (windowSize: 5): Operator<T, [T, T, T, T, T]>
export function slideThroughCyclic<T> (windowSize: 6): Operator<T, [T, T, T, T, T, T]>
export function slideThroughCyclic<T> (windowSize: 7): Operator<T, [T, T, T, T, T, T, T]>
export function slideThroughCyclic<T> (windowSize: 8): Operator<T, [T, T, T, T, T, T, T, T]>
export function slideThroughCyclic<T> (windowSize: 9): Operator<T, [T, T, T, T, T, T, T, T, T]>
export function slideThroughCyclic<T> (windowSize: 10): Operator<T, [T, T, T, T, T, T, T, T, T, T]>
export function slideThroughCyclic<T> (windowSize: number): Operator<T, Array<T>>
export function slideThroughCyclic<T> (windowSize: number): Operator<T, Array<T>> {

  if (!Number.isInteger(windowSize) || windowSize < 1) {
    throw new RangeError(`Window size must be an integer not less than 1; an attempt was made to define the window size as ${windowSize}.`)
  }

  return function* (iterable: Iterable<T>): IterableIterator<Array<T>> {

    // This will slide across the source iterable.
    // We'll be mutating this array, but we'll yield a shallow copy.
    const window: Array<T> = []

    // We need the head later due to the cyclic nature of the operator.
    const head: Array<T> = []

    for (const value of iterable) {
      if (head.length < windowSize) {
        head.push(value)
      }
      window.push(value)
      if (window.length == windowSize) {
        yield [...window]
        window.shift()
      }
    }

    if (head.length === windowSize) {

      // The source iterable is at least as long as the window size, so everything plays out regularly.
      // We just need to yield `windowSize - 1` more tuples, and wrap the window to the beginning.
      for (let i = 0; i < windowSize - 1; i++) {
        window.push(head[i])
        yield [...window]
        window.shift()
      }

    } else /* head.length < windowSize */ {

      // The source iterable was consumed before the window was fully filled in.
      // This means that we didn't yield anything yet, and that both head and window are populated with all
      // values yielded from the source observable.

      // Before proceeding, we must handle a special edge case here: the source iterable can be empty.
      // In that case we're already done, as the correct result is an empty iterable.
      if (head.length == 0) return

      // We firstly populate the window by iterating over the head (which is in this case the whole source iterable)
      // as many times as it's needed to fully fill it in.
      let index = head.length
      while (window.length < windowSize) {
        window.push(head[index++ % head.length])
      }

      // We're ready for the first tuple immediately.
      yield [...window]

      // Now we slide for the other tuples.
      for (let i = 0; i < head.length - 1; i++) {
        window.shift()
        window.push(head[index++ % head.length])
        yield [...window]
      }

    }

  }

}
