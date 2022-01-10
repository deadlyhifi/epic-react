// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext()
function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = [count, setCount]

  return (
    <CountContext.Provider value={value} {...props}>
      {props.children}
    </CountContext.Provider>
  )
}

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within the CountProvider')
  }
  return context
}

export {CountProvider, useCount}
