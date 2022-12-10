import { Component, createElement } from "react";

class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  render() {
    if (this.state.error) {
      return createElement(this.props.fallback, {
        error: this.state.error.toString(),
      });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
