// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
// import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers} from '../../test/server-handlers'

import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
// rest.post(
//   'https://auth-provider.example.com/api/login',
//   async (req, res, ctx) => {},
// )
// you'll want to respond with an JSON object that has the username.
// 📜 https://mswjs.io/
// 🐨 before all the tests, start the server with `server.listen()`
// 🐨 after all the tests, stop the server with `server.close()`
// const server = setupServer(
//   rest.post('https://auth-provider.example.com/api/login', (req, res, ctx) => {
//     return res(ctx.json({username: req.body.username}))
//   }),
// )
// or import a mock server handler.
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const {username, password} = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request!
  userEvent.click(screen.getByRole('button', {name: /submit/i}))

  // as soon as the user hits submit, we render a spinner to the screen. That
  // spinner has an aria-label of "loading" for accessibility purposes, so
  // 🐨 wait for the loading spinner to be removed using waitForElementToBeRemoved
  // 📜 https://testing-library.com/docs/dom-testing-library/api-async#waitforelementtoberemoved
  // screen.debug()
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // once the login is successful, then the loading spinner disappears and
  // we render the username.
  // 🐨 assert that the username is on the screen
  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`omitting username displays an error`, async () => {
  render(<Login />)
  const {password} = buildLoginForm()
  // Purposefully missing username input
  userEvent.type(screen.getByLabelText(/password/i), password)

  userEvent.click(screen.getByRole('button', {name: /submit/i}))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  // expect(screen.getByRole('alert')).toHaveTextContent(/username required/i)
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"username required"`,
  )
})
