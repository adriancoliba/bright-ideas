import React from 'react';
import TextEditor from '../../components/NotepadTextEditor/index';
import Sidebar from '../../components/NotepadSidebar/index'
import noteBackgroundImage from '../../images/2907560.jpg';
import { connect } from 'react-redux';
import {withStyles} from "@material-ui/core";
import style from "../ResetPasswordPage/style";
import { getNotes, selectNote, updateNote, newNote, clearMessage,
  deleteNote, shareNote, showNotepadMessage, clearNotepadShared } from "../../store/actions/notepadActions";
import { authListener } from "../../store/actions/authActions";
import Snackbar from '../../components/Snackbar'

class NotepadPage extends React.PureComponent {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(authListener())
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const uid = this.props.user && this.props.user.id || localStorage.getItem('uid');
    dispatch(getNotes(uid));
  }

  componentWillUnmount() {
    const { dispatch, isNotepadShared } = this.props;
    isNotepadShared && dispatch(clearNotepadShared())
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { dispatch } = this.props;
    nextProps.notepadMessage && setTimeout(() => dispatch(clearMessage()), 5);
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: '',
      uid : this.props.user && this.props.user.id || localStorage.getItem('uid')
    };
    const { dispatch } = this.props;
    dispatch(newNote(note));
  };

  selectNote = (note, index) => {
    const { dispatch } = this.props;
    dispatch(selectNote(note, index))
  };

  updateNote = (id, noteObj) => {
    const { dispatch } = this.props;
    dispatch(updateNote(id, noteObj));
  };

  deleteNote = note => {
    const { dispatch } = this.props;
    dispatch(deleteNote(note));
  };

  shareNote = (note, isAnonymous) => {
    const { dispatch, user } = this.props;
    const post = {
      title: note.title,
      body: note.body,
      uid: user.id,
      displayName: isAnonymous ? 'anonymous' : user.displayName
    };
    if(Object.values(post).some(el => el === '' || el === null)){
      return dispatch(showNotepadMessage('Title or Body might be empty'));
    }
    return dispatch(shareNote(post));
  };

  render() {
    console.log('notesAll', this.props.notesAll)
    return(
      <div className="app-container">
        <Sidebar
          noteSelectedId={this.props.noteSelectedId}
          notesAll={this.props.notesAll}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          shareNote={this.shareNote}
          newNote={this.newNote}
        />
        {
          this.props.noteSelected ?
            <TextEditor noteSelected={ this.props.noteSelected}
                        noteSelectedId={this.props.noteSelectedId}
                        notesAll={this.props.notesAll}
                        updateNote={this.updateNote}
            /> : <img src={noteBackgroundImage} className="noteBackgroundImage" alt=''/>
        }
        <Snackbar message={this.props.notepadMessage}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    user: state.auth.user,
    noteSelectedId: state.notepad.noteSelectedId,
    noteSelected: state.notepad.noteSelected,
    notesAll: state.notepad.notesAll,
    notepadMessage: state.notepad.notepadMessage,
    isNotepadShared: state.notepad.isNotepadShared,
  };
};

export default withStyles(style, { withTheme: true })(connect(mapStateToProps)(NotepadPage));
