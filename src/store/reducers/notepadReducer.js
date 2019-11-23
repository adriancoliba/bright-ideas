import { GET_NOTES_SUCCESS, SELECT_NOTE, NEW_NOTE_SUCCESS, DELETE_NOTE_SUCCESS, START_LOADING,
  SHOW_NOTEPAD_MESSAGE, SHARE_NOTE_SUCCESS, CLEAR_NOTEPAD_SHARED, CLEAR_NOTEPAD_MESSAGE } from '../constants/notepadConstants'

const INITIAL_STATE = {
  noteSelectedId: null,
  noteSelected: null,
  notesAll: [],
  noteTitleUpdated: '',
  noteBodyUpdate: '',
  notepadMessage: null,
  isNotepadShared: null
};

const notepadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOTES_SUCCESS:
      return {
        ...state,
        notesAll: action.notesAll
      };

    case SELECT_NOTE:
      return {
        ...state,
        noteSelectedId: action.index,
        noteSelected: action.note
      };

    case NEW_NOTE_SUCCESS:
      const newNoteIndex = state.notesAll.indexOf(state.notesAll.filter(note => note.id === action.newID)[0]);
      return {
        ...state,
        notesAll: [...state.notesAll, action.newNote],
        noteSelected: state.notesAll[newNoteIndex],
        noteSelectedId: newNoteIndex
      };

    case DELETE_NOTE_SUCCESS:
      const noteId = state.notesAll.indexOf(action.note);
      const checkIfNoteIsSelected = () => {
        if(state.noteSelectedId === noteId){
          return {
            ...state,
            notesAll: state.notesAll.filter(singleNote => singleNote !== action.note),
            noteSelectedId: null, noteSelected: null,
          }
        } else {
          if(state.notesAll.length >= 1){
            return {
              ...state,
              notesAll: state.notesAll.filter(singleNote => singleNote !== action.note),
              noteSelectedId: state.noteSelectedId ? state.noteSelectedId - 1 : null,
              noteSelected: state.noteSelectedId ? state.notesAll[state.noteSelectedId - 1] : null,
            }
          } else {
            return {
              ...state,
              notesAll: state.notesAll.filter(singleNote => singleNote !== action.note),
              noteSelectedId: null, noteSelected: null,
            }
          }
        }
      };
      return checkIfNoteIsSelected();

      case SHARE_NOTE_SUCCESS:
        return {
          ...state,
          notepadMessage: 'successful',
          isNotepadShared: state.isNotepadShared + 1
        };

      case SHOW_NOTEPAD_MESSAGE:
        return {
          ...state,
          notepadMessage: action.message
        };

      case CLEAR_NOTEPAD_SHARED:
        return {
          ...state,
          isNotepadShared: null,
        };

      case CLEAR_NOTEPAD_MESSAGE:
        return {...state, profileMessage: null};

      case START_LOADING:
        return { ...state, loading: true };

    default:
      return state
  }
};

export default notepadReducer;