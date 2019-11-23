import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'
import style from './style';
import { CircularProgress } from '@material-ui/core';
import BlogPost from "../BlogPost";

class BlogPosts extends React.PureComponent {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { classes, posts, usersAll } = this.props;

    if(posts) {
    return(
      <div>
        { posts.map((post, index) => {
            return(
              <div key={index}>
                <BlogPost
                  post={post}
                  usersAll={usersAll}
                />
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