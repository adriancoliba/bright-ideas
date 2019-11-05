import React from 'react';
import firebase from 'firebase';
import './App.css';
import TextEditor from './components/TextEditor/index';
import Sidebar from './components/Sidebar/index'

class App extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      noteSelectedId: '',
      noteSelected: {},
      notesAll: [],
    }
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('notesAll')
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

  render() {
    return(
      <div className="app-container">
        <Sidebar
          noteSelectedId={this.state.noteSelectedId}
          notesAll={this.state.notesAll}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {
          this.state.noteSelected ?
            <TextEditor noteSelected={this.state.noteSelected}
                             noteSelectedId={this.state.noteSelectedId}
                             notesAll={this.state.notesAll}
                             updateNote={this.updateNote}
            /> : null
        }
      </div>
    );
  }
}

export default App;
