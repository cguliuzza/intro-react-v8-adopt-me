// mostly code from reactjs.org/docs/error-boundaries.html
import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    // called directly on the class, not an instance - ex: ErrorBoundary.getDerivedStateFromError()
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // lifecycle method
    console.error("ErrorBoundary caught an error", error, info);
  } // typically used for logging errors to an error reporting service - ex: Sentry, New Relic, TrackJS
  render() {
    // every class component must have a render method
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
