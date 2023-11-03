export function all () {
  return true
}

export function identity<T> (t: T) {
  return t
}

export function qqq<T> (a: T, b: T): boolean {
  return a === b
}

export function isIterable (x: any): x is Iterable<any> {
  if (x == null) return false
  return typeof x[Symbol.iterator] == 'function'
}

export function not<T extends Array<any>> (fn: (...a: T) => true): (...a: T) => false
export function not<T extends Array<any>> (fn: (...a: T) => false): (...a: T) => true
export function not<T extends Array<any>> (fn: (...a: T) => boolean): (...a: T) => boolean
export function not (fn: (...args: any[]) => boolean): (...args: any[]) => boolean {
  return (...args: any[]) => !fn(...args)
}

export const lt = (a: number, b: number) => a < b
export const gt = (a: number, b: number) => a > b

