import curry, { _ } from '../src/curry'

describe('1个参数', () => {
  const fn = curry((a: number) => a)

  // test('足数传入', () => {
  //   expect(fn(1)).toBe(1)
  // })

  test('占位传入', () => {
    expect(fn(_)).toBeInstanceOf(Function)
  })
})
