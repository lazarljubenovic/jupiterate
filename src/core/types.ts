export type UnaryMapper<I, O> = (x: I) => O
export type Operator<I, O> = (x: Iterable<I>) => Iterable<O>
