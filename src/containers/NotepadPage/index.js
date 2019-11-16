import React from 'react';
import TextEditor from '../../components/NotepadTextEditor/index';
import Sidebar from '../../components/NotepadSidebar/index'
import noteBackgroundImage from '../../images/2907560.jpg';
import { connect } from 'react-redux';
import {withStyles} from "@material-ui/core";
import style from "../ResetPasswordPage/style";
import { getNotes, selectNote, updateNote, newNote, deleteNote } from "../../store/actions/notepadActions";
import { authListener } from "../../store/actions/authActions";
class NotepadPage extends React.PureComponent {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(authListener())
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const userId = this.props.user && this.props.user.id || localStorage.getItem('uid');
    dispatch(getNotes(userId));
  }

  newNote = async (title) => {
    const note = {
      title: title,
      body: '',
      userId : this.props.user && this.props.user.id || localStorage.getItem('uid')
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

  render() {
    return(
      <div className="app-container">
        <Sidebar
          noteSelectedId={this.props.noteSelectedId}
          notesAll={this.props.notesAll}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
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
  };
};

export default withStyles(style, { withTheme: true })(connect(mapStateToProps)(NotepadPage));
