export type Unary<I, O> = (x: I) => O
export type Operator<I, O> = (x: Iterable<I>) => IterableIterator<O>
export type Finalizer<T, R> = (iterable: Iterable<T>) => R
export type Eq<T> = (a: T, b: T) => boolean
