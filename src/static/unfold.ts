export function Unfold<T> (
  generateNext: (prev: T) => T,
  seed: T,
): Iterable<T>
export function Unfold<T> (
  generateNext: (prev1: T, prev2: T) => T,
  seed1: T,
  seed2: T,
): Iterable<T>
export function Unfold<T> (
  generateNext: (prev1: T, prev2: T, prev3: T) => T,
  seed1: T,
  seed2: T,
  seed3: T,
): Iterable<T>
export function Unfold<T> (
  generateNext: (prev1: T, prev2: T, prev3: T, prev4: T) => T,
  seed1: T,
  seed2: T,
  seed3: T,
  seed4: T,
): Iterable<T>
export function *Unfold<T> (generateNext: (...prevs: Array<T>) => T, ...seeds: Array<T>): Iterable<T> {
  yield *seeds
  const state = [...seeds]
  while (true) {
    const next = generateNext(...state)
    yield next
    state.shift()
    state.push(next)
  }
}
