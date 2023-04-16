# Jupiterate

A library for performing various operations on any ES iterable (e.g. arrays, maps, sets; but also manually created iterables).

# General notes on documentation

The documentation uses the term “source iterable” to disambiguate among other iterables of interest, when present.
“Source iterable“ is the iterable that the operator is being applied on.
Visually, it's usually iterable “above” or “before” the operator.
In more technical terms, it's the only argument of the function returned by the operator-generating function.

The documentation often refers to the SameValueZero algorithm.
This is very similar to `===`; the only exception is that SameValueZero treats two `NaN`s as equal.
The same operation is used by built-in methods such as `Array#includes`, and in `Map`s and `Set`s for comparing keys.

# Operators

By convention, operators start with a lowercase letter.

- `chunk`
- `concat`
- `differenceUsing`, `differenceBy`, `difference`
- `filter`
- `filterIndex`
- `flatMap`
- `flatten`
- `intersection`
