import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import {
  ListItem, ListItemText, Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import { removeHTMLTags } from '../../utilities';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

class SidebarItem extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      openDeleteDialog: false
    }
  }

  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNote = note => {
    this.props.deleteNote(note);
    this.closeDialog()
  };

  closeDialog = () => {
    this.setState({openDeleteDialog: false});
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
            <Button onClick={this.closeDialog} color="secondary">
              No
            </Button>
            <Button onClick={() => this.deleteNote(note)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(style)(SidebarItem);