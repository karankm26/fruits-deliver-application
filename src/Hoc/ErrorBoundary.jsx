import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error, info) {
    // Optional: transform error into state object properties
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log the error details or perform other actions
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <h1 className="text-center">Something went wrong.</h1>;
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
