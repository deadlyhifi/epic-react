// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

// PLEASE NOTE: there was a subtle change in the order of cleanup functions
// getting called in React 17:
// https://github.com/kentcdodds/react-hooks/issues/90

import * as React from 'react'

function Child() {
  console.log('%c    Child: render start (line 12)', 'color: MediumSpringGreen')

  const [count, setCount] = React.useState(() => {
    console.log('%c    Child: useState(() => 0) (line 14)', 'color: tomato')
    return 0
  })

  React.useEffect(() => {
    console.log(
      '%c    Child: useEffect(() => {}) (line 19)',
      'color: LightCoral',
    )
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}) cleanup 🧹 (line 24)',
        'color: LightCoral',
      )
    }
  })

  React.useEffect(() => {
    console.log(
      '%c    Child: useEffect(() => {}, []) (line 32)',
      'color: MediumTurquoise',
    )
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}, []) cleanup 🧹 (line 37)',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log(
      '%c    Child: useEffect(() => {}, [count]) (line 45)',
      'color: HotPink',
    )
    return () => {
      console.log(
        '%c    Child: useEffect(() => {}, [count]) cleanup 🧹 (line 50)',
        'color: HotPink',
      )
    }
  }, [count])

  const element = (
    <button onClick={() => setCount(previousCount => previousCount + 1)}>
      {count}
    </button>
  )

  console.log('%c    Child: render end (line 64)', 'color: MediumSpringGreen')

  return element
}

function App() {
  console.log('%cApp: render start (line 70)', 'color: MediumSpringGreen')

  const [showChild, setShowChild] = React.useState(() => {
    console.log('%cApp: useState(() => false) (line 72)', 'color: tomato')
    return false
  })

  React.useEffect(() => {
    console.log('%cApp: useEffect(() => {}) (line 77)', 'color: LightCoral')
    return () => {
      console.log(
        '%cApp: useEffect(() => {}) cleanup 🧹 (line 79)',
        'color: LightCoral',
      )
    }
  })

  React.useEffect(() => {
    console.log(
      '%cApp: useEffect(() => {}, []) (line 87)',
      'color: MediumTurquoise',
    )
    return () => {
      console.log(
        '%cApp: useEffect(() => {}, []) cleanup 🧹 (line 92)',
        'color: MediumTurquoise',
      )
    }
  }, [])

  React.useEffect(() => {
    console.log(
      '%cApp: useEffect(() => {}, [showChild]) (line 100)',
      'color: HotPink',
    )
    return () => {
      console.log(
        '%cApp: useEffect(() => {}, [showChild]) cleanup 🧹 (line 105)',
        'color: HotPink',
      )
    }
  }, [showChild])

  const element = (
    <>
      <label>
        <input
          type="checkbox"
          checked={showChild}
          onChange={e => setShowChild(e.target.checked)}
        />{' '}
        show child
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 50,
          width: 50,
          border: 'solid',
        }}
      >
        {showChild ? <Child /> : null}
      </div>
    </>
  )

  console.log('%cApp: render end (line 137)', 'color: MediumSpringGreen')

  return element
}

export default App
