import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, CssBaseline, withStyles, Grid, Box, Paper, Typography, Button} from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPosts } from '../../store/actions/blogActions'
import {getUsersAll} from "../../store/actions/authActions";
import BlogPosts from "../../components/BlogPosts";

class HomePage extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPosts());
    dispatch(getUsersAll());
  }
  render() {
    const { classes } = this.props;
    return (
        <Grid container justify={'center'}>
          <Grid item>
            <Container component="main" maxWidth="xs" className={classes.container}>
              <CssBaseline />
              <Box m={10}/>
              <Paper className={classes.paper}>
                <Typography variant="h2">Free your <br/>thoughts</Typography>
                <Box m={1}/>
                <Typography variant="h5">Organize your mind</Typography>
                <Box m={1}/>
                <Typography variant="h5">Share ideas with everyone</Typography>
                <Box m={3}/>
                <Typography variant="body2">Join Bright Ideas today</Typography>
                <Box m={1}/>
                <Link to={'/signup'}>
                  <Button fullWidth variant="contained" color="primary" className={classes.button}>Sign Up</Button>
                </Link>
              </Paper>
            </Container>
          </Grid>
          <Grid item>
            <Container component="main" maxWidth="sm">
              <CssBaseline />
              <div>
                <Box m={2}/>
                <Typography variant="body2" className={classes.youNeedToSignIn}>You need to be signed in to create and share notes</Typography>
                <BlogPosts posts={this.props.posts} usersAll={this.props.usersAll}/>
              </div>
            </Container>
          </Grid>
        </Grid>
    );
  }
}

HomePage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    posts: state.blog.posts,
    usersAll: state.auth.usersAll,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(HomePage));