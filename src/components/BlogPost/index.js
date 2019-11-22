import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import style from './style';
import { Button, Paper, Avatar, Fade, Popover, Grid, Typography, Divider, Box, } from '@material-ui/core';
import { iconsObject } from "../AvatarUser/imports";
import parse from 'html-react-parser';
import PopoverComponent from '../Popover';

class BlogPost extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      openPopover : null
    };
  }

  handlePopoverOpen = event => {
    this.setState({openPopover : event.currentTarget})
  };

  handlePopoverClose = () => {
    this.setState({openPopover : null})
  };

  render() {
    const { classes, post, usersAll } = this.props;

    const userAll = usersAll && usersAll.filter(user => user.uid === post.uid)[0];
    const avatarId = userAll && post.displayName !== 'Anonymous' ? userAll.avatarId : 'a31';

    const dateParsed = post.date.toDate().toLocaleDateString('en-GB',
      { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const postBodyParsed = parse(post.body.substring(0, 200));

    return (
      <div key={post.id}>
        {post.displayName !== 'Anonymous' && <PopoverComponent openPopover={this.state.openPopover} userAll={userAll}/>}
        <Paper className={classes.paper}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item>
              <Avatar className={classes.avatar}
                      aria-owns={Boolean(this.state.openPopover) ? 'mouse-over-popover' : undefined}
                      aria-haspopup="true"
                      onMouseEnter={this.handlePopoverOpen}
                      onMouseLeave={this.handlePopoverClose}>
                <img src={iconsObject[avatarId]} width={'95%'} alt=''/>
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1"
                          color={'secondary'}
                          aria-owns={Boolean(this.state.openPopover) ? 'mouse-over-popover' : undefined}
                          aria-haspopup="true"
                          onMouseEnter={this.handlePopoverOpen}
                          onMouseLeave={this.handlePopoverClose}>
                {post.displayName}
              </Typography>
            </Grid>
          </Grid>
          <Divider/> <Box m={2} />
          <Typography variant="body1" className={classes.primaryDarkColor}>{post.title}</Typography>
          <Typography variant="body2" component={'span'} >{postBodyParsed}{post.body.length > 199 && ' ...'}</Typography>
          <Box m={2} /> <Divider/> <Box m={2} />
          <Typography variant="caption">{dateParsed}</Typography>
        </Paper>
      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(BlogPost);