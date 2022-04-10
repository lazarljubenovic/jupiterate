export function andFinally<T, P extends ReadonlyArray<any>, R> (
  staticFunction: (iterable: Iterable<T>, ...params: P) => R,
  ...params: P
): (iterable: Iterable<T>) => R {
  return function (iterable: Iterable<T>): R {
    return staticFunction(iterable, ...params)
  }
}
