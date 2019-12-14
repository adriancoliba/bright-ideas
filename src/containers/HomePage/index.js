import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, CssBaseline, withStyles, Grid, Box, Paper, Typography, Button} from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPosts } from '../../store/actions/blogActions'
import {getUsersAll} from "../../store/actions/authActions";
import BlogPosts from "../../components/BlogPosts";
import WarningIcon from '../../images/warning.svg'
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
          <Grid item lg={3}>
            <Container component="main" maxWidth="xs" className={classes.container}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Typography variant="h1" style={{fontSize: 50}}>Free your <br/>thoughts</Typography>
                <Box m={1}/>
                <Typography variant="h2">Organize your mind</Typography>
                <Box m={1}/>
                <Typography variant="h2">Share ideas with everyone</Typography>
                <Box m={3}/>
                <Typography variant="h3">Join Bright Ideas today</Typography>
                <Box m={1}/>
                <Link to={'/signup'} style={{textDecoration: 'none'}}>
                  <Button fullWidth  variant="contained" color="primary" className={classes.button}>Sign Up</Button>
                </Link>
              </Paper>
            </Container>
          </Grid>
          <Grid item xs={12} sm={11} md={7} lg={5} xl={4}>
            <Container component="main" maxWidth={'lg'}>
              <CssBaseline />
              <div>
                <Box m={2}/>
                <Grid container alignItems={'center'} justify={'flex-end'}>
                  <Grid item>
                    <Typography variant="h4" className={classes.youNeedToSignIn}>You need to be signed in to create and share notes &nbsp;</Typography>
                  </Grid>
                  <Grid item>
                    <img src={WarningIcon} width={18} alt=''/>
                  </Grid>
                </Grid>
                <BlogPosts posts={this.props.posts} usersAll={this.props.usersAll}/>
              </div>
            </Container>
          </Grid>
        </Grid>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object,
  isUserAuthenticated: PropTypes.bool,
  posts: PropTypes.array,
  usersAll: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
    posts: state.blog.posts,
    usersAll: state.auth.usersAll,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(HomePage));