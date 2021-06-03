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
import { NOTES_STORAGE_KEY } from "../constants";

interface State {
  byId: { [k: string]: Note };
  allIds: string[];
}

const notesFromStorage = getStateFromStorage<State>(NOTES_STORAGE_KEY) || {
  byId: {},
  allIds: []
};

const initialState: {
  state: State;
  dispatch: Dispatch<{
    type: string;
    // payload: Note[];
    payload: State;
  }>;
} = {
  state: notesFromStorage,
  dispatch: () => {}
};
const NotesContext = createContext(initialState);

const SAVE = "save";
const ADD = "add";
const DELETE = "delete";

const reducer = (state: State, action: { type: string; payload?: State }) => {
  switch (action.type) {
    case ADD: {
      return action.payload || state;
    }
    case SAVE: {
      return action.payload || state;
    }
    case DELETE: {
      return action.payload || state;
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

// TODO: normalizirati state?
const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used withing a NotesProvider!");
  }

  const { state, dispatch } = context;

  const getAllIds: () => string[] = useCallback(() => {
    // return state.map(note => note.id);
    return state.allIds;
  }, [state.allIds]);

  const get: (id: string) => Note | undefined = id => {
    // return state.find(note => note.id === id);
    return state.byId[id];
  };

  const save: (id: string, source: string) => void = (id, source) => {
    // const newState = state.map(note => {
    //   if (note.id === id) {
    //     return {
    //       ...note,
    //       content: source
    //     };
    //   }

    //   return note;
    // });
    const newState: State = {
      ...state,
      byId: { ...state.byId, [id]: { ...state.byId[id], content: source } }
    };

    dispatch({
      type: SAVE,
      payload: newState
    });
  };

  const add: (initialSource: string) => string | void = useCallback(
    initialSource => {
      const newNote = {
        id: uuidv4(),
        content: initialSource
      };
      // const newState: Note[] = [...state, newNote];
      const newState: State = {
        byId: { ...state.byId, [newNote.id]: newNote },
        allIds: state.allIds.concat(newNote.id)
      };

      dispatch({
        type: ADD,
        payload: newState
      });

      return newNote.id;
    },
    [dispatch, state.allIds, state.byId]
  );

  const remove: (id: string) => void = id => {
    // const newState = state.filter(note => note.id !== id);
    const newState: State = {
      ...state,
      allIds: state.allIds.filter(noteId => noteId !== id)
    };
    delete newState.byId[id];

    dispatch({
      type: DELETE,
      payload: newState
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
