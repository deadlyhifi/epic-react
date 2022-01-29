// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

const setup = ({initialProps} = {}) => {
  const result = {}
  function TestComponent() {
    // Expose all the data and functions useCounter exposes.
    result.current = useCounter(initialProps)
    return null
  }
  render(<TestComponent />)
  return result
}

test('exposes the count and increment/decrement functions', () => {
  const result = setup()
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(1)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows setting of `initialCount` value', () => {
  const result = setup({initialProps: {initialCount: 10}})
  expect(result.current.count).toBe(10)

  act(() => result.current.increment())
  expect(result.current.count).toBe(11)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(10)
})

test('allows setting of `step` value', () => {
  const result = setup({initialProps: {step: 10}})
  expect(result.current.count).toBe(0)

  act(() => result.current.increment())
  expect(result.current.count).toBe(10)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows setting of `initialCount` and `step` value', () => {
  const result = setup({initialProps: {initialCount: 10, step: 10}})
  expect(result.current.count).toBe(10)

  act(() => result.current.increment())
  expect(result.current.count).toBe(20)

  act(() => result.current.decrement())
  expect(result.current.count).toBe(10)
})

/* eslint no-unused-vars:0 */
