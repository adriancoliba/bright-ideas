import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import style from "./style";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import NotepadPage from "../../containers/NotepadPage";
import { connect } from 'react-redux';
import { setUserDeAuthenticated } from '../../store/actions/authActions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  onSignOut = () => {
    const { dispatch } = this.props;
    dispatch(setUserDeAuthenticated())
  };

  render() {
    const { classes, isUserAuthenticated } = this.props;
    const { pathname } = this.props.location;
    return (
      <AppBar position="static" className={classes.appBar} color="secondary">
        <Toolbar>
          <Typography variant="body1" color="inherit" className={classes.toolbarTitle}>
            My Title
          </Typography>
          <span className={classes.toolbarLinks}>
            { !isUserAuthenticated ?
              <>
                <Link to="/">
                  <Button variant={pathname === '/' ? 'outlined' : 'text'} className={classes.button}>Home</Button>
                </Link>
                <Link to="/signin">
                  <Button variant={pathname === '/signin' ? 'outlined' : 'text'}  className={classes.button}>Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant={pathname === '/signup' ? 'outlined' : 'text'}  className={classes.button}>Sign Up</Button>
                </Link>
              </> :
                <Link to="/">
                  <Button variant={'outlined'} onClick={this.onSignOut} className={classes.button}>Sign Out</Button>
                </Link>
            }
           </span>
        </Toolbar>
      </AppBar>
    );
  }
}

{/*<IconButton color="inherit" aria-label="More Options">*/}
{/*  <MoreVertIcon />*/}
{/*</IconButton>*/}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool,
};


export default withStyles(style, { withTheme: true })(withRouter(connect()(NavigationBar)));