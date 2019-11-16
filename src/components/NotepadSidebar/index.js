import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import SidebarItem from '../NotepadSidebarItem/index';
import { Divider, Button, List } from '@material-ui/core';

class Sidebar extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }

  newNoteBtnClick = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  };

  updateTitle = (txt) => {
    this.setState({ title: txt });
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: null, addingNote: false });
  };

  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNote = (note) => this.props.deleteNote(note);

  render() {
    const { classes, notesAll, noteSelectedId } = this.props;

    if(notesAll) {
      return(
        <div className={classes.sidebarContainer}>
          <Button
            onClick={this.newNoteBtnClick}
            className={classes.newNoteBtn}>{this.state.addingNote ? 'Cancel' : 'New Note'}
          </Button>
          {
            this.state.addingNote ?
              <div>
                <input type='text'
                       className={classes.newNoteInput}
                       placeholder='Enter note title'
                       onKeyUp={(e) => this.updateTitle(e.target.value)}>
                </input>
                <Button
                  className={classes.newNoteSubmitBtn}
                  onClick={this.newNote}>Submit Note</Button>
              </div> :
              null
          }
          <List className={classes.listNotesSidebar}>
            {
              notesAll.map((note, index) => {
                return(
                  <div key={index}>
                    <SidebarItem
                      note={note}
                      index={index}
                      noteSelectedId={noteSelectedId}
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote}
                    />
                    <Divider/>
                  </div>
                )
              })
            }
          </List>
        </div>
      );
    } else {
      return(<div>&nbsp;</div>);
    }
  }

}

export default withStyles(style, { withTheme: true })(Sidebar);