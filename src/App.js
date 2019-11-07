import React from 'react';
import firebase from 'firebase';
import './App.css';
import TextEditor from './components/TextEditor/index';
import Sidebar from './components/Sidebar/index'
import noteBackgroundImage from './images/2907560.jpg';
import theme from './utils/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

class App extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      noteSelectedId: null,
      noteSelected: null,
      notesAll: [],
    }
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('notesAll')
      .orderBy("timestamp", "asc")
      .onSnapshot(serverUpdate => {
        const notesAll = serverUpdate.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        this.setState({notesAll})
      })
  }

  selectNote = (note, index) => this.setState({ noteSelectedId: index, noteSelected: note });

  updateNote = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notesAll')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  newNote = async (title) => {
    const newNote = {
      title: title,
      body: ''
    };
    const netNoteFromDB = await firebase
      .firestore()
      .collection('notesAll')
      .add({
        title: newNote.title,
        body: newNote.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = netNoteFromDB.id;
    await this.setState({ notesAll: [...this.state.notesAll, newNote] });
    const newNoteIndex = this.state.notesAll.indexOf(this.state.notesAll.filter(note => note.id === newID)[0]);
    this.setState({ noteSelected: this.state.notesAll[newNoteIndex], noteSelectedId: newNoteIndex });
  };

  deleteNote = async (note) => {
    const noteId = this.state.notesAll.indexOf(note);
    await this.setState({ notesAll: this.state.notesAll.filter(singleNote => singleNote !== note) });
    if(this.state.noteSelectedId === noteId) {
      this.setState({ noteSelectedId: null, noteSelected: null });
    } else {
      this.state.notesAll.length >= 1 ?
        this.selectNote(this.state.notesAll[this.state.noteSelectedId - 1], this.state.noteSelectedId - 1) :
        this.setState({ noteSelectedId: null, noteSelected: null });
    }

    firebase
      .firestore()
      .collection('notesAll')
      .doc(note.id)
      .delete();
  };

  render() {
    console.log(this.state.notesAll)
    return(
      <MuiThemeProvider theme={theme}>
        <div className="app-container">
          <Sidebar
            noteSelectedId={this.state.noteSelectedId}
            notesAll={this.state.notesAll}
            selectNote={this.selectNote}
            deleteNote={this.deleteNote}
            newNote={this.newNote}
          />
          {
            this.state.noteSelected ?
              <TextEditor noteSelected={this.state.noteSelected}
                               noteSelectedId={this.state.noteSelectedId}
                               notesAll={this.state.notesAll}
                               updateNote={this.updateNote}
              /> : <img src={noteBackgroundImage} className="noteBackgroundImage" alt=''/>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
