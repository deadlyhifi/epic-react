// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, act} from '@testing-library/react'
import useCounter from '../../components/use-counter'

let result
function TestComponent(props) {
  // Expose all the data and functions useCounter exposes.
  result = useCounter(props)
  return null
}

test('exposes the count and increment/decrement functions', () => {
  render(<TestComponent />)
  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(1)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows setting of `initialCount` value', () => {
  render(<TestComponent initialCount={10} />)
  expect(result.count).toBe(10)

  act(() => result.increment())
  expect(result.count).toBe(11)

  act(() => result.decrement())
  expect(result.count).toBe(10)
})

test('allows setting of `step` value', () => {
  render(<TestComponent step={10} />)
  expect(result.count).toBe(0)

  act(() => result.increment())
  expect(result.count).toBe(10)

  act(() => result.decrement())
  expect(result.count).toBe(0)
})

test('allows setting of `initialCount` and `step` value', () => {
  render(<TestComponent initialCount={10} step={10} />)
  expect(result.count).toBe(10)

  act(() => result.increment())
  expect(result.count).toBe(20)

  act(() => result.decrement())
  expect(result.count).toBe(10)
})

/* eslint no-unused-vars:0 */
