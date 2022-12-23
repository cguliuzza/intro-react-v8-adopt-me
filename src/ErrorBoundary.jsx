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
      // We totally could have made ErrorBoundary a bit more flexible and made it able to accept a component to display in cases of errors. In general I recommend the "WET" code rule (as opposed to DRY, lol): Write Everything Twice (or I even prefer Write Everything Thrice). In this case, we have one use case for this component, so I won't spend the extra time to make it flexible. If I used it again, I'd make it work for both of those use cases, but not every use case. On the third or fourth time, I'd then go back and invest the time to make it flexible.
      return (
        this.props.errorMessage || (
          <h2>
            There was an error with this listing. <Link to="/">Click here</Link>{" "}
            to back to the home page.
          </h2>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
