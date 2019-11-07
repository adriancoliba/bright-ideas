import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import ReactQuill from 'react-quill';
import CreateIcon from '@material-ui/icons/Create';
import { debounce } from '../../utils/utilities';

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
  };

  componentDidUpdate = () => {
    if(this.props.noteSelected.id !== this.state.id) {
      this.setState({
        text: this.props.noteSelected.body,
        title: this.props.noteSelected.title,
        id: this.props.noteSelected.id
      });
    }
  };

  update = debounce(() => {
    this.props.updateNote(this.state.id, {
      title: this.state.title,
      body: this.state.text
    })
  }, 1500);

  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };

  updateTitle = async (txt) => {
    await this.setState({ title: txt });
    this.update();
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

export default withStyles(style, { withTheme: true })(TextEditor);