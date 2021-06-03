import { createContext, useContext, useReducer, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

import { Note } from "../../features/notes/types";
import { getStateFromStorage } from "./storage";

const STORAGE_KEY = "@notes-app/notes";

const notesFromStorage: Note[] = getStateFromStorage(STORAGE_KEY) || [];

const initialState = {
  state: notesFromStorage,
  dispatch: () => {}
} as {
  state: Note[];
  dispatch: Dispatch<{
    type: string;
    payload?: string | Note | undefined;
  }>;
};
const NotesContext = createContext(initialState);

const SAVE = "save";
const ADD = "add";
const DELETE = "delete";

const reducer = (
  state: Note[],
  action: { type: string; payload?: Note | string }
) => {
  switch (action.type) {
    case ADD: {
      const newState = [...state, action.payload as Note];
      return newState;
    }
    case SAVE: {
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
      return state.filter(note => note.id !== action.payload);
    }
    default: {
      return state;
    }
  }
};

// TODO: tipovi za children
const NotesProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, notesFromStorage);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => {
  const { state, dispatch } = useContext(NotesContext);

  const getAllIds: () => string[] = () => {
    return state.map(note => note.id);
  };

  const get: (id: string) => Note | undefined = id => {
    return state.find(note => note.id === id);
  };

  const save: (id: string, source: string) => void = (id, source) => {
    dispatch({
      type: SAVE,
      payload: {
        id,
        content: source
      }
    });
  };

  const add: (initialSource: string) => void = initialSource => {
    const id = uuidv4();
    dispatch({
      type: ADD,
      payload: {
        id,
        content: initialSource
      }
    });
  };

  const remove: (id: string) => void = id => {
    dispatch({
      type: DELETE,
      payload: id
    });
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
