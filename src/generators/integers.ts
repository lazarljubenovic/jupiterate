export function* integers (start: number = 0, end: number = Infinity): IterableIterator<number> {
  let n = start
  while (n < end) {
    yield n++
  }
}
