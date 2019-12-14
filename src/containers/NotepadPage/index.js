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
import Snackbar from '../../components/Snackbar';
import BounceLoaderComponent from "../../components/BounceLoader";
import PropTypes from "prop-types";

class NotepadPage extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      loading: true
    }
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(authListener())
  }

  componentDidMount() {
    const { dispatch, userAll } = this.props;
    dispatch(getNotes(userAll.uid));
    setTimeout(() => this.setState({loading: false}), 2500)
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
    const { dispatch, userAll } = this.props;
    const note = {
      title: title,
      body: '',
      uid : userAll.uid,
    };
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
    const { dispatch, userAll } = this.props;
    const post = {
      title: note.title,
      body: note.body,
      uid: userAll.uid,
      displayName: isAnonymous ? 'Anonymous' : userAll.displayName
    };
    if(Object.values(post).some(el => el === '' || el === null)){
      return dispatch(showNotepadMessage('Title or Body might be empty'));
    }
    return dispatch(shareNote(post));
  };

  render() {
    return(
      <div>
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
                        userAll={this.props.userAll}
                        updateNote={this.updateNote}
            />
            :
            this.state.loading ?
              <BounceLoaderComponent loading={this.state.loading}/>
              :
              <img src={noteBackgroundImage} className="noteBackgroundImage" alt=''/>
        }
        <Snackbar message={this.props.notepadMessage}/>
      </div>
    );
  }
}

NotepadPage.propTypes = {
  isUserAuthenticated: PropTypes.bool.isRequired,
  userAll: PropTypes.object,
  usersAll: PropTypes.array,
  noteSelectedId: PropTypes.number,
  noteSelected: PropTypes.object,
  notesAll: PropTypes.array.isRequired,
  notepadMessage: PropTypes.string,
  isNotepadShared: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    userAll: state.auth.userAll,
    usersAll: state.auth.usersAll,
    noteSelectedId: state.notepad.noteSelectedId,
    noteSelected: state.notepad.noteSelected,
    notesAll: state.notepad.notesAll,
    notepadMessage: state.notepad.notepadMessage,
    isNotepadShared: state.notepad.isNotepadShared,
  };
};

export default withStyles(style, { withTheme: true })(connect(mapStateToProps)(NotepadPage));
