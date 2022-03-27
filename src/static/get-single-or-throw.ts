export type GetSingleOrThrowErrorReason =
  | 'found-more-than-one'
  | 'found-zero'

export type GetSingleOrThrowErrorFactory = (reason: GetSingleOrThrowErrorReason) => Error

const DEFAULT_ERROR_FACTORY = (reason: GetSingleOrThrowErrorReason) => {
  switch (reason) {
    case 'found-more-than-one':
      return new Error(`Expected only one item, but found more than one.`)
    case 'found-zero':
      return new Error(`Expected exactly one item, but got zero.`)
  }
}

export function getSingleOrThrow<T> (
  iterable: Iterable<T>,
  errorFactory: GetSingleOrThrowErrorFactory = DEFAULT_ERROR_FACTORY,
): T {
  let theOnlyItem: T
  let count: number = 0
  for (const item of iterable) {
    theOnlyItem = item
    count++
    if (count > 1) {
      throw errorFactory('found-more-than-one')
    }
  }
  if (count == 0) {
    throw errorFactory('found-zero')
  }
  return theOnlyItem!
}
