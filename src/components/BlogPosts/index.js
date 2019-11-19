import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import style from './style';
import {
  Button, Paper, Avatar, Fade, Modal, Backdrop, Grid, CircularProgress,
  Dialog, DialogContent, DialogContentText, DialogActions, Divider, List
} from '@material-ui/core';
import BlogPost from "../BlogPost";
import { getPosts, } from "../../store/actions/blogActions";

class BlogPosts extends React.PureComponent {
  constructor() {
    super();
    this.state = {

    };
  }

  componentWillReceiveProps(nextProps, nextContext) {

  }


  render() {
    const { classes, posts } = this.props;

    if(posts) {
    return(
      <div>
        { posts.map((post, index) => {
            return(
              <div key={index}>
                <BlogPost
                  post={post}
                />
                {/*<Divider/>*/}
              </div>
            )
          })
        }
      </div>
    );
    } else {
      return (<div> <CircularProgress/> </div>);
    }
  }
}

export default withStyles(style, { withTheme: true })(BlogPosts);