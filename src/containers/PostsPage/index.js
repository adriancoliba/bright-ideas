import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, CssBaseline, withStyles} from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import {Switch, Route,} from "react-router-dom";
import Post from '../../components/Post'

class PostsPage extends Component {

  render() {
    return (
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Switch>
            <Route path={'/posts/:postId'}>
              <Post />
            </Route>
          </Switch>
        </Container>
    );
  }
}

PostsPage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    posts: state.blog.posts,
    usersAll: state.auth.usersAll,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(PostsPage));