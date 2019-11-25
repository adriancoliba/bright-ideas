import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, CssBaseline, withStyles, Box, Paper, Typography, Button} from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
class HomePage extends Component {

  render() {
    const { classes } = this.props;
    return (
        <Container component="main" maxWidth="xs" className={classes.container}>
          <CssBaseline />
          <Box m={10}/>
            <Paper className={classes.paper}>
              <Typography variant="h2">Free your <br/>thoughts</Typography>
              <Box m={2}/>
              <Typography variant="h5">Organize your mind</Typography>
              <Box m={1}/>
              <Typography variant="h5">Share ideas with everyone</Typography>
              <Box m={1}/>
              <Typography variant="h5">See what people are posting</Typography>
              <Box m={3}/>
              <Typography variant="body2">Join Bright Ideas today</Typography>
              <Box m={1}/>
              <Link to={'/signup'}>
                <Button fullWidth variant="contained" color="primary" className={classes.button}>Sign Up</Button>
              </Link>
            </Paper>
        </Container>
    );
  }
}

HomePage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(HomePage));