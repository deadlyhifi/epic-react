// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
const UseCounterHookExample = ({initialCount = 0, step = 1} = {}) => {
  const {count, increment, decrement} = useCounter({initialCount, step})

  return (
    <>
      <div>count: {count}</div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<UseCounterHookExample />)

  const count = screen.getByText(/count:/i)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})

  expect(count).toHaveTextContent(/count: 0/i)
  userEvent.click(increment)
  expect(count).toHaveTextContent(/count: 1/i)
  userEvent.click(decrement)
  expect(count).toHaveTextContent(/count: 0/i)
})

test('allows setting of `initialCount` value', () => {
  render(<UseCounterHookExample initialCount={10} />)

  const count = screen.getByText(/count:/i)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})

  expect(count).toHaveTextContent(/count: 10/i)
  userEvent.click(increment)
  expect(count).toHaveTextContent(/count: 11/i)
  userEvent.click(decrement)
  expect(count).toHaveTextContent(/count: 10/i)
})

test('allows setting of `step` value', () => {
  render(<UseCounterHookExample step={10} />)

  const count = screen.getByText(/count:/i)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})

  expect(count).toHaveTextContent(/count: 0/i)
  userEvent.click(increment)
  expect(count).toHaveTextContent(/count: 10/i)
  userEvent.click(decrement)
  expect(count).toHaveTextContent(/count: 0/i)
})

test('allows setting of `initialCount` and `step` value', () => {
  render(<UseCounterHookExample initialCount={10} step={10} />)

  const count = screen.getByText(/count:/i)
  const increment = screen.getByRole('button', {name: /increment/i})
  const decrement = screen.getByRole('button', {name: /decrement/i})

  expect(count).toHaveTextContent(/count: 10/i)
  userEvent.click(increment)
  expect(count).toHaveTextContent(/count: 20/i)
  userEvent.click(decrement)
  expect(count).toHaveTextContent(/count: 10/i)
})

/* eslint no-unused-vars:0 */
