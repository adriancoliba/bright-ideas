import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
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

BlogPosts.propTypes = {
  usersAll: PropTypes.array,
  posts: PropTypes.array.isRequired,
};

export default withStyles(style, { withTheme: true })(BlogPosts);