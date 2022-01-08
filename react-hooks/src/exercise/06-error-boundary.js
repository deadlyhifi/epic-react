import * as React from 'react'

class ErrorBoundary extends React.Component {
  state = {error: null}

  static getDerivedStateFromError(error) {
    return {error}
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log('ErrorBoundary', error, errorInfo)
  }

  render() {
    const {error} = this.state

    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}

export default ErrorBoundary
