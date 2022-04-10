export function ForEach<T> (iterable: Iterable<T>, fn: (item: T, index: number) => void): void {
  let index: number = 0
  for (const item of iterable) {
    fn(item, index++)
  }
}
