import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import style from './style';
import { Button, Paper, Avatar, Grid,
  Dialog, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';
import { iconsObject, iconsArray } from './imports'

class AvatarsUser extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      avatarId: '',
      openModal: false,
      lol: true
    };
  }

  componentDidUpdate() {
    this.props.avatarId && this.state.avatarId === '' && this.setState({avatarId: this.props.avatarId})
  }
  componentWillReceiveProps(nextProps, nextContext) {
    nextProps.avatarId !== this.props.avatarId && this.setState({openModal: false})
  }

  handleCloseModal = () => { this.setState({openModal: false, avatarId: this.props.avatarId}) };

  handleOpenModal = () => { this.setState({openModal: true}) };

  handleSelectAvatar = index => {
    this.setState({avatarId: `a${index + 1}`})
  };

  changeAvatar = () => this.props.changeAvatar(this.state.avatarId) ;

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <img src={iconsObject[this.props.avatarId]} width={'95%'} alt=''/>
          </Avatar>
          <Button color="secondary" className={classes.buttonChange} onClick={this.handleOpenModal}>
            Change <br/> Avatar
          </Button>
        </Paper>

        <Dialog
          open={this.state.openModal}
          onClose={this.handleCloseModal}
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              tabIndex={-1}
              component={'span'}
            >
              <Grid container justify="center">
                {iconsArray.map((icon, index) => {
                  const isSelected = this.state.avatarId.substr(1) == index + 1;
                  return (
                    <Grid item key={icon}>
                      <div onClick={() => this.handleSelectAvatar(index)}>
                        <Avatar className={
                          classNames(classes.avatar, !isSelected && classes.notSelectedAvatar, isSelected && classes.selectedAvatar)
                        }>
                          <img src={icon} width={'95%'} alt=''/>
                        </Avatar>
                      </div>
                    </Grid>
                  )
                })}
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={this.handleCloseModal} variant="contained" className={classes.pinkDarkColor}>
              Cancel
            </Button>
            <Button onClick={this.changeAvatar} variant="contained" color="primary" >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(AvatarsUser);