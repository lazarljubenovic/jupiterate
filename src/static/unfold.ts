export function Unfold<T> (
  seed: T,
  generateNext: (prev: T) => T,
): Iterable<T>
export function Unfold<T> (
  seed1: T,
  seed2: T,
  generateNext: (prev1: T, prev2: T) => T,
): Iterable<T>
export function Unfold<T> (
  seed1: T,
  seed2: T,
  seed3: T,
  generateNext: (prev1: T, prev2: T, prev3: T) => T,
): Iterable<T>
export function Unfold<T> (
  seed1: T,
  seed2: T,
  seed3: T,
  seed4: T,
  generateNext: (prev1: T, prev2: T, prev3: T, prev4: T) => T,
): Iterable<T>
export function *Unfold<T> (...args: Array<any>): Iterable<T> {
  const seeds = args.slice(0, -1)
  const generateNext = args[args.length - 1]
  yield *seeds
  const state = [...seeds]
  while (true) {
    const next = generateNext(...state)
    yield next
    state.shift()
    state.push(next)
  }
}
