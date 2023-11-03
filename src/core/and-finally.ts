/**
 * A utility which allows invoking a static function to the end of the pipe chain.
 *
 * @param staticFunction - A static function to perform. Its first argument must
 *        be an iterable.
 * @param params - The parameters passed to the static function.
 */
export function andFinally<T, P extends ReadonlyArray<any>, R> (
  staticFunction: (iterable: Iterable<T>, ...params: P) => R,
  ...params: P
): (iterable: Iterable<T>) => R {
  return function (iterable: Iterable<T>): R {
    return staticFunction(iterable, ...params)
  }
}
