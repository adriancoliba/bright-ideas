import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import ReactQuill from 'react-quill';
import CreateIcon from '@material-ui/icons/Create';
import { debounce } from '../../utils/utilities';
import {connect} from "react-redux";
import ReactDOM from 'react-dom';
import ShareIcon from "@material-ui/icons/Share";
import ShareNoteDialog from "../Dialogs/ShareNoteDialog";
import { showNotepadMessage, shareNote } from "../../store/actions/notepadActions";
import {ListItem, Tooltip} from "@material-ui/core";

class TextEditor extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      body: '',
      title: '',
      id: '',
      openShareDialog: false,
      isAnonymous: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      body: this.props.noteSelected.body,
      title: this.props.noteSelected.title,
      id: this.props.noteSelected.id
    });
    ReactDOM.findDOMNode(this).children[2].children[1].children[0].focus();
  };

  componentDidUpdate = (prevState) => {
    if(this.props.noteSelected.id !== this.state.id) {
      this.setState({
        body: this.props.noteSelected.body,
        title: this.props.noteSelected.title,
        id: this.props.noteSelected.id
      });
      ReactDOM.findDOMNode(this).children[2].children[1].children[0].focus()
    }
  };

  update = debounce(() => {
    this.props.updateNote(this.state.id, {
      title: this.state.title ? this.state.title : '',
      body: this.state.body ? this.state.body : ''
    })
  }, 1500);

  updateBody = (val) => {
    this.update();
    this.setState({ body: val.trim() });
  };

  updateTitle = (txt) => {
    this.setState({ title: txt.trim() });
    this.update()
  };

  shareNote = (note, isAnonymous) => {
    const { dispatch, userAll } = this.props;
    const post = {
      title: note.title,
      body: note.body,
      uid: userAll.uid,
      displayName: isAnonymous ? 'Anonymous' : userAll.displayName
    };
    if(Object.values(post).some(el => el === '' || el=== '<p><br></p>'|| el === null)){
      return dispatch(showNotepadMessage('Title or Body might be empty'));
    }
    this.closeDialog();
    return dispatch(shareNote(post));
  };

  closeDialog = () => {
    this.setState({openShareDialog: false, isAnonymous: false,});
  };

  handleChangeAnonymous = () => {
    this.setState({isAnonymous: !this.state.isAnonymous})
  };

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.textEditorContainer}>
        <CreateIcon className={classes.editIcon}/>
        <input
          className={classes.titleInput}
          placeholder='Note title...'
          value={this.state.title ? this.state.title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}>
        </input>
        <ReactQuill
          theme={'snow'}
          onChange={this.updateBody}
          value={this.state.body || ''}
          modules={TextEditor.module}
          formats={TextEditor.formats}
          bounds={'.app-container'}
          placeholder={'Write some text...'}
        />
        <Tooltip arrow title={'Share this note with the world'}>
          <ShareIcon
            onClick={() => this.setState({openShareDialog: true})}
            className={classes.shareIcon}
          />
        </Tooltip>
        <ShareNoteDialog
          openShareDialog={this.state.openShareDialog}
          closeDialog={this.closeDialog}
          isAnonymous={this.state.isAnonymous}
          handleChangeAnonymous={this.handleChangeAnonymous}
          shareNote={this.shareNote}
          note={{title: this.state.title, body: this.state.body}}
        />
      </div>
    );
  }
}

TextEditor.module = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['link'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

TextEditor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link'
];

const mapStateToProps = (state) => {
  return {
    noteTitleUpdated: state.notepad.noteTitleUpdated,
    noteBodyUpdated: state.notepad.noteBodyUpdated,
  };
};

export default withStyles(style, { withTheme: true })(connect(mapStateToProps)(TextEditor));
