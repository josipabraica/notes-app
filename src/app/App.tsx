import { ErrorBoundary } from "react-error-boundary";

import { NotesList } from "../features/notes";
import { ErrorFallback } from "../common/components/error-fallback";
import { GlobalStyle } from "./styled";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <NotesList />

      <GlobalStyle />
    </ErrorBoundary>
  );
}

export default App;
