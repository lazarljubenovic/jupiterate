/**
 * @short
 * *Unfold* an iterable from a seed and a rule for generating successive values.
 *
 * @categories
 * generator
 *
 * @description
 * Creates a new iterable. Its first few values are the seeds fed into the function,
 * while each next yielded value is determined based on the same number of previous
 * values.
 *
 * @since 0.0.1
 *
 * @parameter
 * ...seeds
 * ...T[]
 * Several first values.
 *
 * @parameter
 * generateNext
 * (...prev: T[], index: number) => T
 * The function used for determining the next value to yield. It receives several
 * previous values (the same number as the number of given seeds), and the index
 * of the value being generated. Indexes are counted from 0, starting with the
 * seeds (e.g. with two seeds, the first time the `generateNext` function is called,
 * `index` will be 2 because 0 and 1 are already taken by the two seeds).
 *
 * @returns
 * IterableIterator<T>
 *
 * @example
 * j.Unfold(1, x => 2 * x)
 * // => [1, 2, 4, 8, 16, 32, ...
 *
 * @example
 * j.Unfold(1, 1, (a, b) => a + b))
 * // => [1, 1, 2, 3, 5, 8, 13, 21, ...
 */
export function Unfold<T> (
  seed: T,
  generateNext: (prev: T, index: number) => T,
): IterableIterator<T>
export function Unfold<T> (
  seed1: T,
  seed2: T,
  generateNext: (prev1: T, prev2: T, index: number) => T,
): IterableIterator<T>
export function Unfold<T> (
  seed1: T,
  seed2: T,
  seed3: T,
  generateNext: (prev1: T, prev2: T, prev3: T, index: number) => T,
): IterableIterator<T>
export function Unfold<T> (
  seed1: T,
  seed2: T,
  seed3: T,
  seed4: T,
  generateNext: (prev1: T, prev2: T, prev3: T, prev4: T, index: number) => T,
): IterableIterator<T>
export function *Unfold<T> (...args: Array<any>): IterableIterator<T> {
  const seeds = args.slice(0, -1)
  const generateNext = args[args.length - 1]
  yield *seeds
  const state = [...seeds]
  let index = seeds.length
  while (true) {
    const next = generateNext(...state, index++)
    yield next
    state.shift()
    state.push(next)
  }
}
