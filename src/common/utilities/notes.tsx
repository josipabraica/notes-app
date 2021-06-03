import {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
  useMemo
} from "react";
import { v4 as uuidv4 } from "uuid";

import { Note } from "../../features/notes/types";
import { getStateFromStorage, setStateToStorage } from "./storage";

const STORAGE_KEY = "@notes-app/notes";

const notesFromStorage = getStateFromStorage<Note[]>(STORAGE_KEY) || [];

const initialState: {
  state: Note[];
  dispatch: Dispatch<{
    type: string;
    payload: Note[];
  }>;
} = {
  state: notesFromStorage,
  dispatch: () => {}
};
const NotesContext = createContext(initialState);

const SAVE = "save";
const ADD = "add";
const DELETE = "delete";

const reducer = (state: Note[], action: { type: string; payload?: Note[] }) => {
  switch (action.type) {
    case ADD: {
      return action.payload || [];
    }
    case SAVE: {
      return action.payload || [];
    }
    case DELETE: {
      return action.payload || [];
    }
    default: {
      return state;
    }
  }
};

const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, notesFromStorage);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <NotesContext.Provider value={contextValue}>
      {children}
    </NotesContext.Provider>
  );
};

// TODO: normalizirati state?
const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used withing a NotesProvider!");
  }

  const { state, dispatch } = context;

  // TODO: ovdje spremati u local storage, ali nisam sigurna hoce li upalit?
  // useEffect(() => {
  //   console.log("state changed");
  // }, [state]);

  const getAllIds: () => string[] = () => {
    return state.map(note => note.id);
  };

  const get: (id: string) => Note | undefined = id => {
    return state.find(note => note.id === id);
  };

  const save: (id: string, source: string) => void = (id, source) => {
    const newState = state.map(note => {
      if (note.id === id) {
        return {
          ...note,
          content: source
        };
      }

      return note;
    });

    try {
      setStateToStorage<Note[]>(STORAGE_KEY, newState);

      dispatch({
        type: SAVE,
        payload: newState
      });
    } catch (error) {}
  };

  const add: (initialSource: string) => string | void = initialSource => {
    const newNote = {
      id: uuidv4(),
      content: initialSource
    };
    const newState: Note[] = [...state, newNote];

    try {
      setStateToStorage<Note[]>(STORAGE_KEY, newState);

      dispatch({
        type: ADD,
        payload: newState
      });

      return newNote.id;
    } catch (error) {}
  };

  const remove: (id: string) => void = id => {
    const newState = state.filter(note => note.id !== id);

    try {
      setStateToStorage<Note[]>(STORAGE_KEY, newState);

      dispatch({
        type: DELETE,
        payload: newState
      });
    } catch (error) {}
  };

  return {
    getAllIds,
    get,
    save,
    add,
    remove
  };
};

export { NotesProvider, useNotes };
