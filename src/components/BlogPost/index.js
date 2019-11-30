import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import style from './style';
import globalStyle from '../../utils/globalStyle';
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
    const postBodyParsed = parse(`${post.body.substring(0, 300)} ${post.body.length>299 ? '...' : ''}`);

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
              <Typography variant="h3"
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
          <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
            <Link to={`/posts/${post.id}`} className={classes.decorationTransformNone}>
              <Typography variant="h2" className={classes.colorPrimaryDark}>{post.title}</Typography>
            </Link>
            <Typography variant="h3" component={'span'} style={{marginBottom: '2px'}} className={classes.postBodyParsed}>{postBodyParsed}</Typography>
          </div>
          {post.body.length > 299 &&
            <Link to={`/posts/${post.id}`} className={classes.textDecorationNone}>
              <Button variant="contained" className={classNames(classes.readMoreButton, classes.textTransformNone)}>
                continue reading
              </Button>
            </Link>
          }
          <Box m={2} /> <Divider/> <Box m={2} />
          <Grid container alignItems='center' justify='space-between'>
            <Grid item >
              <Typography variant="h4">{dateParsed}</Typography>
            </Grid>
            <Grid item >
              <Link to={`/posts/${post.id}`} className={classes.textDecorationNone}>
                <Button className={classNames(classes.textTransformNone, classes.colorPrimaryDark)}>{post.comments.length} comments</Button>
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </div>
    )
  }
}

export default withStyles((theme) => ({
  ...style(theme),
  ...globalStyle(theme),
}), { withTheme: true })(BlogPost);