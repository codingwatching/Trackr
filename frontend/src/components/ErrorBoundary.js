import { Component, createElement } from "react";
import formatError from "../utils/formatError";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  reset() {
    this.setState({ error: null });
  }

  render() {
    if (this.state.error) {
      return createElement(this.props.fallback, {
        error: formatError(this.state.error),
      });
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
