import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import {
  ListItem, ListItemText, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, Checkbox
} from '@material-ui/core';
import { removeHTMLTags } from '../../utils/utilities';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ShareNoteDialog from '../../components/Dialogs/ShareNoteDialog'

class SidebarItem extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      openDeleteDialog: false,
      openShareDialog: false,
      isAnonymous: false,
    }
  }

  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNote = note => {
    this.props.deleteNote(note);
    this.closeDialog()
  };

  shareNote = note => {
    this.props.shareNote(note, this.state.isAnonymous);
    this.closeDialog()
  };

  closeDialog = () => {
    this.setState({openDeleteDialog: false, openShareDialog: false, isAnonymous: false,});
  };

  handleChangeAnonymous = () => {
    this.setState({isAnonymous: !this.state.isAnonymous})
  };

  render() {
    const { classes, index, note, noteSelectedId } = this.props;

    return(
      <div key={index}>
        <ListItem
          className={classes.listItem}
          selected={noteSelectedId === index}
          alignItems='flex-start'>
          <div className={classes.textSection} onClick={() => this.selectNote(note, index)}>
            <ListItemText
              primary={note.title}
              secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}
            />
          </div>
          <ShareIcon
            onClick={() => this.setState({openShareDialog: true})}
            className={classes.shareIcon}
          />
          <DeleteIcon
            onClick={() => this.setState({openDeleteDialog: true})}
            className={classes.deleteIcon}
          />
        </ListItem>

        <Dialog
          open={this.state.openDeleteDialog}
          onClose={this.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className={classes.dialogText}>
              This note will be deleted, are you sure
              <HelpOutlineIcon
                className={classes.helpOutlineIcon}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} className={classes.darkPink}>
              No
            </Button>
            <Button onClick={() => this.deleteNote(note)} color="secondary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <ShareNoteDialog
          openShareDialog={this.state.openShareDialog}
          closeDialog={this.closeDialog}
          isAnonymous={this.state.isAnonymous}
          handleChangeAnonymous={this.handleChangeAnonymous}
          shareNote={this.shareNote}
          note={note}
        />
      </div>
    );
  }
}

export default withStyles(style, { withTheme: true })(SidebarItem);