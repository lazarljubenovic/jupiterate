# 0.0.3 (2023-11-04)

## New

### `chunkStrict`

The newly added operator `chunkStrict` behaves similarly to the existing `chunk`, but will throw an error while iterating over the source iterable if the size of the last chunk could not be equal to the specified `chunkSize`.

# 0.0.2 (2023-11-03)

## Improvements

### Operators

#### `chunk`

- When the `chunkSize` value is known at compile-time, the return type of the operator will now reflect that and return a suitable union of tuples instead of an array with a generic length. 

  For example, `chunk(3)` will now return `Operator<T, [T] | [T, T] | [T, T, T]>` instead of `Operator<T, Array<T>>`.
