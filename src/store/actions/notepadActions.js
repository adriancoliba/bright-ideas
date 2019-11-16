import { myFirebase } from "../../utils/firebase";
import { GET_NOTES_SUCCESS, SELECT_NOTE, NEW_NOTE_SUCCESS, DELETE_NOTE_SUCCESS} from "../constants/notepadConstants";
import firebase from "firebase";

export const getNotes = () => (dispatch, getState) => {
  myFirebase
    .firestore()
    .collection('notesAll')
    .orderBy("date", "asc")
    .onSnapshot(serverUpdate => {
      const notesAll = serverUpdate.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      })
    dispatch(getNotesSuccess(notesAll));
    });
};

export const getNotesSuccess = (notesAll) => {
  return {
    type: GET_NOTES_SUCCESS,
    notesAll,
  }
};

export const selectNote = (note, index) => {
  return {
    type: SELECT_NOTE,
    note,
    index,
  }
};

export const updateNote = (id, noteObj) => {

  return () => {
    const noteRef = myFirebase.firestore().collection('notesAll').doc(id);
    return noteRef.update({
      title: noteObj.title,
      body: noteObj.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {

  })
    .catch(function(error) {

    });

  }
};

export const deleteNote = note => (dispatch, getState) => {
  const noteRef = myFirebase.firestore().collection('notesAll').doc(note.id);
  return noteRef.delete()
    .then(() => {
      dispatch(deleteNoteSuccess(note))
    })
};

export const deleteNoteSuccess = (note) => {
  return {
    type: DELETE_NOTE_SUCCESS,
    note
  }
};

export const newNote = newNote => dispatch => {
  myFirebase
    .firestore()
    .collection('notesAll')
    .add({
      title: newNote.title,
      body: newNote.body,
      date: new Date(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(newNoteFromDB => {
      const newID = newNoteFromDB.id;
      dispatch(newNoteSuccess(newNote, newID))
    })
};

export const newNoteSuccess = (newNote, newID) => {
  return {
    type: NEW_NOTE_SUCCESS,
    newNote,
    newID,
  }
};