import Home from './Home';
import About from './About';
import Projects from './Projects';
import { ErrorBoundary } from 'react-error-boundary';

function MyFallbackComponent({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>{`Something went wrong:(`}</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

const WrappedHome = () => {
  return (
    <ErrorBoundary FallbackComponent={MyFallbackComponent}>
      <Home />
    </ErrorBoundary>
  );
};
const WrappedAbout = () => {
  return (
    <ErrorBoundary FallbackComponent={MyFallbackComponent}>
      <About />
    </ErrorBoundary>
  );
};
const WrappedProjects = () => {
  return (
    <ErrorBoundary FallbackComponent={MyFallbackComponent}>
      <Projects />
    </ErrorBoundary>
  );
};

export { WrappedHome, WrappedAbout, WrappedProjects };
