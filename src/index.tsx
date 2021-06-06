import ReactDOM from "react-dom";

import { StrictMode } from "react";

import { App } from "./app";
import reportWebVitals from "./reportWebVitals";

import { NotesProvider } from "./common/context/notesContext";

ReactDOM.render(
  <StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
