import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import { Box, Divider, Paper, Popover, Typography} from '@material-ui/core';
import PropTypes from "prop-types";

class PopoverComponent extends React.PureComponent {
  render() {
    const { classes, openPopover, userAll } = this.props;
    const userDate = userAll ? userAll.date.toDate().toLocaleDateString('en-GB',
      { day: '2-digit', month: 'short', year: 'numeric' }) : 'unknown'
    if(userAll){
      return (
        <Popover
          id="mouse-over-popover"
          className={classes.popover}
          open={Boolean(openPopover)}
          anchorEl={openPopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Paper className={classes.paper}>
            <Typography variant="h3" className={classes.primaryDarkColor} style={{fontWeight: 'bold'}}>Profile Info:</Typography>
            <Typography variant="h3" component={'span'} >{userAll.profileInfo}</Typography>
            <Box m={2} /> <Divider/> <Box m={2} />
            <Typography variant="h4">Email: &nbsp; {userAll.email}</Typography>
            <Box/>
            <Typography variant="h4">Joined community on: &nbsp; {userDate}</Typography>
          </Paper>
        </Popover>
      )
    } else {
      return <div>&nbsp;</div>
    }
  }
}

PopoverComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  openPopover: PropTypes.any,
  userAll: PropTypes.object,
};

export default withStyles(style, { withTheme: true })(PopoverComponent);