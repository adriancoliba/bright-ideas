import React from 'react';
import './App.css';

const firebase = require('firebase');

class App extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      selectedNoteId: '',
      selectedNote: {},
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
        console.log(notesAll);
        this.setState({notesAll})
      })
  }

  render(){
    const { notesAll } = this.state;

    const displayNotesAll = notesAll && notesAll.map(note => {
      return (
        <div key={note.id}>
          <h3>title: {note.title}</h3>
          <p>body: {note.body}</p>
        </div>
      )
    });

    return (
      <div>{displayNotesAll}</div>
    )
  }
}

export default App;
