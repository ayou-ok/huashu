export const _ = {
  _: '_',
}

function isPlaceholder (a: any) {
  return a === _ && a._ === _._ 
}

type AnyFunction = (...args: any[]) => any

/**
 * 
 * @param required 本次柯里化需要的实参数量
 * @param receieved 本次传入的实参
 * @param fn 柯里化函数对象
 * @returns 
 */
function _curryN (required: number, receieved: any[], fn: AnyFunction) {
  return () => {
    const combind: any[] = []

    let left = required
    let combindIndex = 0
    let argIndex = 0

    while (combindIndex < receieved.length || argIndex < arguments.length) {
      let param: any

      /**
       * 利用arguments替换received中的placeholder
       */
      if (
        combindIndex < receieved.length &&
        (!isPlaceholder(receieved[combindIndex]) || argIndex >= arguments.length)
      ) {
        param = receieved[combindIndex]
      } else {
        param = arguments[argIndex]
        argIndex++
      }

      combind[combindIndex] = param

      if (!isPlaceholder(param)) {
        left--
      }

      combindIndex++
    }

    if (left <= 0) return fn(...combind)
    return _curryN(left, combind, fn)
  }
}

function curry1 (fn: AnyFunction) {
  return function f1 (a: any) {
    if (arguments.length === 0 || isPlaceholder(a)) {
      return f1
    }
    return fn(...[].slice.call(arguments))
  }
}

function curry2 (fn: AnyFunction) {
  return function f2 (a0: any, a1: any) {
    switch (arguments.length) {
      case 0:
        return f2
      case 1:
        return isPlaceholder(a0) ?
          f2 :
          curry1((a1: any) => fn(a0, a1))
      default:
        return fn()
    }
  }
}

export const curryN2 = curry2((required: number, fn: AnyFunction) => {
  if (required === 1) {
    return curry1(fn)
  }

  return _curryN(length, [], fn)
})

export const curryN = _curryN(2, [], (required: number, fn: AnyFunction) => _curryN(required, [], fn))

function curry (fn) {
  return _curryN(fn.length, [], fn)
}

export default curry
