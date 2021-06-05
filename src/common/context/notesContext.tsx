import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
  useMemo,
  useCallback,
  useEffect
} from "react";
import { v4 as uuidv4 } from "uuid";

import { Note } from "../../features/notes/types";
import { getStateFromStorage, setStateToStorage } from "../utilities/storage";
import { NOTES_STORAGE_KEY, SAVE, ADD, DELETE } from "../constants";

type State = Note[];

const notesFromStorage = getStateFromStorage<State>(NOTES_STORAGE_KEY) || [];

const initialState: {
  state: State;
  dispatch: Dispatch<{
    type: string;
    payload?: Note | string;
  }>;
} = {
  state: notesFromStorage,
  dispatch: () => {}
};
const NotesContext = createContext(initialState);

const reducer = (
  state: State,
  action: { type: string; payload?: Note | string }
) => {
  switch (action.type) {
    case ADD: {
      if (!action.payload || typeof action.payload === "string") {
        return state;
      }

      const newState = [...state, action.payload];
      return newState;
    }
    case SAVE: {
      if (!action.payload || typeof action.payload === "string") {
        return state;
      }

      return state.map(note => {
        if (note.id === (action.payload as Note).id) {
          return {
            ...note,
            ...(action.payload as Note)
          };
        }

        return note;
      });
    }
    case DELETE: {
      if (!action.payload || typeof action.payload !== "string") {
        return state;
      }

      return state.filter(note => note.id !== action.payload);
    }
    default: {
      return state;
    }
  }
};

const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, notesFromStorage);

  useEffect(() => {
    setStateToStorage<State>(NOTES_STORAGE_KEY, state);
  }, [state]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider!");
  }

  const { state, dispatch } = context;

  const getAllIds: () => string[] = useCallback(() => {
    return state.map(note => note.id);
  }, [state]);

  const get: (id: string) => Note | undefined = id => {
    return state.find(note => note.id === id);
  };

  const save: (id: string, source: string) => void = (id, source) => {
    const note = get(id);

    if (note) {
      const payload: Note = {
        ...note,
        content: source
      };

      dispatch({
        type: SAVE,
        payload
      });
    }
  };

  const add: (initialSource: string) => string | void = useCallback(
    initialSource => {
      const payload = {
        id: uuidv4(),
        content: initialSource
      };

      dispatch({
        type: ADD,
        payload
      });

      return payload.id;
    },
    [dispatch]
  );

  const remove: (id: string) => void = useCallback(
    id => {
      dispatch({
        type: DELETE,
        payload: id
      });
    },
    [dispatch]
  );

  return {
    getAllIds,
    get,
    save,
    add,
    remove
  };
};

export { NotesProvider, useNotes };
