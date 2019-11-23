import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import style from './style';
import {Button, Paper, Avatar, Fade, Popover, Grid, Typography, Divider, Box, TextField,} from '@material-ui/core';
import { iconsObject } from "../AvatarUser/imports";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {withRouter} from 'react-router-dom';
import parse from "html-react-parser";
import {postCommentToPost, clearMessage, showPostMessage} from '../../store/actions/blogActions';

class Post extends React.PureComponent {
  constructor(){
    super();
    this.state = {
      postId: null,
      comment: {
        displayName: '',
        text: '',
      },
    };
  }
  componentDidMount() {
    const { location, userAll } = this.props;
    this.setState({
      postId: location.pathname.replace('/posts/', ''),
      comment: {
        ...this.state.comment,
        displayName: userAll && userAll.displayName,
      }
    })
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { dispatch } = this.props;
    nextProps.postMessage && setTimeout(() => dispatch(clearMessage()), 3500);
  }

  handleChangeComment = event => {
    this.setState({
      comment: {
        ...this.state.comment,
        [event.target.name]: event.target.value
      }
    })
  };

  onPostComment = () => {
    const { dispatch } = this.props;
    const { comment } = this.state;
    if(comment.displayName.length < 3){
      return dispatch(showPostMessage(null, 'Complete a name'))
    } else if (comment.text.length < 5){
      return dispatch(showPostMessage(null, 'Complete some text'))
    }
    const post = this.props.posts && this.props.posts.filter(post => post.id === this.state.postId)[0];
    const allComments = Object.assign([], post.comments);
    allComments.push({uid: this.props.userAll.uid, displayName: comment.displayName, text: comment.text, date: new Date()});
    return dispatch(postCommentToPost(post.id, allComments))
  };

  render() {
    const { classes, posts, usersAll, location, postMessage } = this.props;
    const postId = location.pathname.replace('/posts/', '');
    const post = posts && posts.filter(post => post.id === postId)[0];
    const userAll = usersAll && this.props.usersAll.filter(user => user.uid === post.uid)[0];
    const avatarId = userAll && (post.displayName !== 'Anonymous' ? userAll.avatarId : 'a31');

    return (
      <div>
        <Paper className={classes.paper}>
          <Typography variant="h4" className={classes.primaryDarkColor}>{post && post.title}</Typography>
          <Typography variant="subtitle1" color={'secondary'}>
            {userAll && post.displayName !== 'Anonymous' ? `by ${userAll.displayName}` : ' by Anonymous'}
          </Typography>
          <Divider/> <Box m={2} />
          <Typography variant="body2" component={'span'} style={{marginBottom: '2px'}}>{post && parse(post.body)}</Typography>
        </Paper>

        { post && post.displayName !== 'Anonymous' &&
          <Paper className={classNames(classes.paper, classes.whiteBackground)}>
            <Grid container alignItems={'center'}>
              <Grid item>
                <Avatar className={classes.avatar}>
                  <img src={iconsObject[avatarId]} width={'95%'} alt=''/>
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" color={'secondary'}>
                  {userAll && `About ${userAll.displayName}`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="caption">{userAll && userAll.profileInfo}</Typography>
              </Grid>
            </Grid>
          </Paper>
        }

        <Paper className={classNames(classes.paper, classes.whiteBackground)}>
          <Typography variant="subtitle1" color={'secondary'}>
            {post && post.comments.length} comments
          </Typography>
          <Divider/> <Box m={2} />
          {post && post.comments.length > 0 &&
            post.comments.map((comment, index) => {
              return (
                <div key={index}>
                  <Typography variant="subtitle1" >{comment.displayName}</Typography>
                  <Typography variant="caption" >{comment.text}</Typography>
                  <Box m={2} /><Divider/> <Box m={2} />
                </div>
              )
            })
          }
          <Box m={6} />
          <Typography variant="caption">Post a comment:</Typography>
          <Box m={2} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="displayName"
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Name"
                value={this.state.comment.displayName}
                onChange={this.handleChangeComment}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="text"
                label="Text"
                name="text"
                autoComplete="text"
                multiline
                rows="4"
                value={this.state.comment.text}
                onChange={this.handleChangeComment}
              />
            </Grid>
            <Grid item >
              <Button variant="contained" color="secondary" onClick={this.onPostComment}>post comment</Button>
            </Grid>
            {postMessage &&
            <Grid item style={{marginTop: 10}}>
              <Typography variant="caption" className={postMessage === 'successful' ? classes.greenColor : classes.darkPinkColor}>
                {postMessage}
              </Typography>
            </Grid>
            }
          </Grid>
        </Paper>
        <Box m={10}/>
      </div>
    )
  }
}

Post.propTypes = {};

const mapStateToProps = (state) => {
  return {
    posts: state.blog.posts,
    postMessage: state.blog.postMessage,
    usersAll: state.auth.usersAll,
    userAll: state.auth.userAll,
  }
};

export default withStyles(style, { withTheme: true })(withRouter(connect(mapStateToProps)(Post)));
