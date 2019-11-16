export type Unary<I, O> = (x: I) => O
export type Operator<I, O> = (x: Iterable<I>) => Iterable<O>
export type Ender<T, R> = (iterable: Iterable<T>) => R
export type Eq<T> = (a: T, b: T) => boolean
