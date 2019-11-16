import { GET_NOTES_SUCCESS, SELECT_NOTE, NEW_NOTE_SUCCESS, DELETE_NOTE_SUCCESS } from '../constants/notepadConstants'

const INITIAL_STATE = {
  noteSelectedId: null,
  noteSelected: null,
  notesAll: [],
  noteTitleUpdated: '',
  noteBodyUpdate: '',
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
              noteSelectedId: state.notesAll[state.noteSelectedId - 1], noteSelected: state.noteSelectedId - 1,
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

    default:
      return state
  }
};

export default notepadReducer;