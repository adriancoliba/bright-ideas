import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import style from './style';
import { Button, Paper, Avatar, Fade, Popover, Grid, Typography, Divider, Box, } from '@material-ui/core';
import { iconsObject } from "../AvatarUser/imports";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';

class Post extends React.PureComponent {

  render() {
    const { classes, posts, usersAll, location } = this.props;
    const postId = location.pathname.replace('/posts/', '');
    const post = posts && posts.filter(post => post.id === postId)[0];
    const userAll = usersAll && this.props.usersAll.filter(user => user.uid === post.uid)[0];
    const avatarId = userAll && (post.displayName !== 'Anonymous' ? userAll.avatarId : 'a31');

    console.log(postId)

    console.log(post)
    console.log(this.props.usersAll)

    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container justify={'center'} alignItems={'center'}>
            <Grid item>
              <Avatar className={classes.avatar}>
                <img src={iconsObject[avatarId]} width={'95%'} alt=''/>
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" color={'secondary'}>
                {userAll && post.displayName !== 'Anonymous' ? userAll.displayName : 'Anonymous'}
              </Typography>
            </Grid>
          </Grid>

        </Paper>
      </div>
    )
  }
}

Post.propTypes = {};

const mapStateToProps = (state) => {
  return {
    posts: state.blog.posts,
    usersAll: state.auth.usersAll,
  }
};
export default withStyles(style, { withTheme: true })(withRouter(connect(mapStateToProps)(Post)));
