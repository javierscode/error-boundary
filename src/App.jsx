import "./App.css";
import ErrorFallback from "./AppFallback";
import { withErrorBoundary } from "./ErrorBoundary";

function handleUndefined(a) {
  return a.get("b").get("c");
}

function App() {
  const a = handleUndefined(undefined);
  return (
    <>
      <h2>Hello World</h2>
      <p>{a}</p>
    </>
  );
}

export default withErrorBoundary({
  fallback: <ErrorFallback />,
  onError: (...args) => console.log(args),
})(App);
