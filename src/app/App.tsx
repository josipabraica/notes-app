import { ErrorBoundary } from "react-error-boundary";

import { NotesList } from "../features/notes";
import { ErrorFallback } from "../common/components/error-fallback";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NotesList />
    </ErrorBoundary>
  );
}

export default App;
