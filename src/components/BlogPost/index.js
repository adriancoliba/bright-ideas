import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import style from './style';
import { Button, Paper, Avatar, Grid, Typography, Divider, Box, } from '@material-ui/core';
import { iconsObject } from "../AvatarUser/imports";
import parse from 'html-react-parser';
import PopoverComponent from '../Popover';
import { Link } from 'react-router-dom';

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
    const postBodyParsed = parse(`${post.body.substring(0, 300)} ${post.body.length>299 && '...'}`);
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
                {userAll && (post.displayName !== 'Anonymous' ? userAll.displayName : 'Anonymous')}
              </Typography>
            </Grid>
          </Grid>
          <Divider/> <Box m={2} />

          <Link to={`/posts/${post.id}`} className={classes.buttonNoTransform}>
            <Typography variant="h5" className={classes.primaryDarkColor}>{post.title}</Typography>
          </Link>
          <Typography variant="body2" component={'span'} style={{marginBottom: '2px'}}>{postBodyParsed}</Typography>

          {post.body.length > 299 &&
          <Link to={`/posts/${post.id}`}>
            <Button variant="contained" className={classNames(classes.readMoreButton, classes.buttonNoTransform)}>continue reading</Button>
          </Link>
          }
          <Box m={2} /> <Divider/> <Box m={2} />
          <Grid container alignItems='center' justify='space-between'>
            <Grid item >
              <Typography variant="caption">{dateParsed}</Typography>
            </Grid>
            <Grid item >
              <Link to={`/posts/${post.id}`}>
                <Button className={classes.buttonNoTransform}>{post.comments.length} comments</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(BlogPost);