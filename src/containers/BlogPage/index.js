import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, CssBaseline, Box, withStyles } from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import BlogPosts from '../../components/BlogPosts'
import {getPosts} from "../../store/actions/blogActions";

class BlogPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPosts());
  }

  render() {
    const { classes, posts } = this.props;
    console.log(this.props.posts)
    return (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box m={2}/>
          <div>
            <BlogPosts posts={posts}/>
          </div>
        </Container>
      </div>
    );
  }
}

BlogPage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    posts: state.blog.posts
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(BlogPage));