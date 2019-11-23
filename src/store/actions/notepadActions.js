import { myFirebase } from "../../utils/firebase";
import { GET_NOTES_SUCCESS, SELECT_NOTE, NEW_NOTE_SUCCESS, DELETE_NOTE_SUCCESS, START_LOADING,
  SHARE_NOTE_SUCCESS, SHOW_NOTEPAD_MESSAGE, CLEAR_NOTEPAD_SHARED, CLEAR_NOTEPAD_MESSAGE} from "../constants/notepadConstants";
import firebase from "firebase";

export const getNotes = (uid) => (dispatch, getState) => {
  myFirebase
    .firestore()
    .collection('notesAll')
    .orderBy("date", "asc")
    .onSnapshot(serverUpdate => {
      const notesAll = serverUpdate.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      }).filter(doc => {
        return doc.uid === uid
      });
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

export const shareNote = post => (dispatch, getState) => {
  myFirebase
    .firestore()
    .collection('posts')
    .add({
      title: post.title,
      body: post.body,
      uid: post.uid,
      displayName: post.displayName,
      comments: [],
      date: new Date(),
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(newNoteFromDB => {
      dispatch(shareNoteSuccess())
    })
    .catch(error => {
      dispatch(showNotepadMessage(error.message))
    })
};

export const shareNoteSuccess = (note) => {
  return {
    type: SHARE_NOTE_SUCCESS,
    note
  }
};

export const showNotepadMessage = (message) => {
  return {
    type: SHOW_NOTEPAD_MESSAGE,
    message
  }
};
export const newNote = newNote => dispatch => {
  myFirebase
    .firestore()
    .collection('notesAll')
    .add({
      title: newNote.title,
      body: newNote.body,
      uid: newNote.uid,
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

export const clearNotepadShared = () => {
  return {
    type: CLEAR_NOTEPAD_SHARED,
  }
};

export const clearMessage = () => {
  return {
    type: CLEAR_NOTEPAD_MESSAGE,
  }
};

export const startLoading = () => {
  return {
    type: START_LOADING,
  }
};