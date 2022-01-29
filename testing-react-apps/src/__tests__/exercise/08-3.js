// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows setting of `initialCount` value', () => {
  const {result} = renderHook(useCounter, {
    initialProps: {initialCount: 10},
  })
  expect(result.current.count).toBe(10)

  act(() => result.current.increment())
  expect(result.current.count).toBe(11)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(10)
})

test('allows setting of `step` value', () => {
  const {result} = renderHook(useCounter, {
    initialProps: {step: 10},
  })
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(10)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows setting of `initialCount` and `step` value', () => {
  const {result} = renderHook(useCounter, {
    initialProps: {initialCount: 10, step: 10},
  })
  expect(result.current.count).toBe(10)

  act(() => result.current.increment())
  expect(result.current.count).toBe(20)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(10)
})

test('allows changing of `step` value', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 16}})
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(16)

  rerender({step: 8})

  act(() => result.current.decrement())
  expect(result.current.count).toBe(8)
})

/* eslint no-unused-vars:0 */
