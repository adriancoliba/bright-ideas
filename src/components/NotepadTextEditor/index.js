import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import ReactQuill from 'react-quill';
import CreateIcon from '@material-ui/icons/Create';
import { debounce } from '../../utils/utilities';
import {connect} from "react-redux";
import ReactDOM from 'react-dom';

class TextEditor extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      text: '',
      title: '',
      id: ''
    };
  }

  componentDidMount = () => {
    this.setState({
      text: this.props.noteSelected.body,
      title: this.props.noteSelected.title,
      id: this.props.noteSelected.id
    });
    ReactDOM.findDOMNode(this).children[2].children[1].children[0].focus();
  };

  componentDidUpdate = (prevState) => {
    if(this.props.noteSelected.id !== this.state.id) {
      this.setState({
        text: this.props.noteSelected.body,
        title: this.props.noteSelected.title,
        id: this.props.noteSelected.id
      });
      ReactDOM.findDOMNode(this).children[2].children[1].children[0].focus()
    }
  };

  update = debounce(() => {
    this.props.updateNote(this.state.id, {
      title: this.state.title ? this.state.title : '',
      body: this.state.text ? this.state.text : ''
    })
  }, 1500);

  updateBody = (val) => {
    this.update();
    this.setState({ text: val.trim() });
  };

  updateTitle = (txt) => {
    this.setState({ title: txt.trim() });
    this.update()
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
          value={this.state.text || ''}
          onChange={this.updateBody}
          theme={'snow'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    noteTitleUpdated: state.notepad.noteTitleUpdated,
    noteBodyUpdated: state.notepad.noteBodyUpdated,
  };
};

export default withStyles(style, { withTheme: true })(connect(mapStateToProps)(TextEditor));
