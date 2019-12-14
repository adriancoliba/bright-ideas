import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Checkbox } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import PropTypes from "prop-types";

class ShareNoteDialog extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return(
        <Dialog
          open={this.props.openShareDialog}
          onClose={this.props.closeDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description" className={classes.dialogText}>
              Share this post anonymously
              <HelpOutlineIcon
                className={classes.helpOutlineIcon}
              />
              <Checkbox
                checked={this.props.isAnonymous}
                onChange={this.props.handleChangeAnonymous}
                value="checkedA"
                inputProps={{
                  'aria-label': 'primary checkbox',
                }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeDialog} className={classes.darkPink}>
              Cancel
            </Button>
            <Button onClick={() => this.props.shareNote(this.props.note, this.props.isAnonymous)} color="secondary" autoFocus>
              Send
            </Button>
          </DialogActions>
        </Dialog>
    );
  }
}

ShareNoteDialog.propTypes = {
  shareNote: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  note: PropTypes.object.isRequired,
  isAnonymous: PropTypes.bool.isRequired,
  handleChangeAnonymous: PropTypes.func.isRequired,
  openShareDialog: PropTypes.bool.isRequired,
};

export default withStyles(style, { withTheme: true })(ShareNoteDialog);