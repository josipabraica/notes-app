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

      return {
        byId: { ...state.byId, [action.payload.id]: action.payload },
        allIds: state.allIds.concat(action.payload.id)
      };
    }
    case SAVE: {
      if (!action.payload || typeof action.payload === "string") {
        return state;
      }

      return {
        ...state,
        byId: {
          ...state.byId,
          [action.payload.id]: {
            ...state.byId[action.payload.id],
            ...action.payload
          }
        }
      };
    }
    case DELETE: {
      if (!action.payload || typeof action.payload !== "string") {
        return state;
      }

      const newState: State = {
        ...state,
        allIds: state.allIds.filter(noteId => noteId !== action.payload)
      };
      delete newState.byId[action.payload];

      return newState;
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
    throw new Error("useNotes must be used withing a NotesProvider!");
  }

  const { state, dispatch } = context;

  const getAllIds: () => string[] = useCallback(() => {
    return state.allIds;
  }, [state.allIds]);

  const get: (id: string) => Note | undefined = id => {
    return state.byId[id];
  };

  const save: (id: string, source: string) => void = (id, source) => {
    const note = get(id);

    if (note) {
      const payload: Note = { ...note, content: source };

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
