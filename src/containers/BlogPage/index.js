import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, CssBaseline, withStyles, Box } from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import BlogPosts from '../../components/BlogPosts'
import {getPosts} from "../../store/actions/blogActions";
import {getUsersAll} from "../../store/actions/authActions";

class BlogPage extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPosts());
    dispatch(getUsersAll())
  }

  render() {
    const { posts, usersAll } = this.props;
    return (
      <div>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div>
            <BlogPosts posts={posts} usersAll={usersAll}/>
          </div>
        </Container>
        <Box m={10}/>
      </div>
    );
  }
}

BlogPage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    posts: state.blog.posts,
    usersAll: state.auth.usersAll,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(BlogPage));