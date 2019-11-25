import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import style from "./style";
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserDeAuthenticated } from '../../store/actions/authActions';
import { checkUserAuth } from '../../utils/utilities'
import LogoIdea from '../../images/logo/idea.svg'

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
    const { classes, isUserAuthenticated, isNotepadShared } = this.props;
    const { pathname } = this.props.location;
    return (
      <AppBar position="static" className={classes.appBar} color="secondary">
        <Toolbar className={classes.toolbar}>
          <img src={LogoIdea} width={38} className={classes.logoIcon} alt=''/>
          <Typography variant="h5" color="inherit" className={classes.logoText} component={'span'}>
            Bright Ideas
          </Typography>
          <span className={classes.toolbarLinks}>
            { checkUserAuth(isUserAuthenticated) ?
              <>
                <Link to="/">
                  <Badge color="primary"
                         badgeContent={isNotepadShared}
                         className={isNotepadShared ? classes.badge : null}>
                    <Button variant={pathname === '/' ? 'outlined' : 'text'} className={classes.button}>Blog</Button>
                  </Badge>
                </Link>
                <Link to="/notepad">
                  <Button variant={pathname === '/notepad' ? 'outlined' : 'text'}  className={classes.button}>Notepad</Button>
                </Link>
                <Link to="/profile">
                  <Button variant={pathname === '/profile' ? 'outlined' : 'text'}  className={classes.button}>Profile Settings</Button>
                </Link>
                <Link to="/">
                  <Button onClick={this.onSignOut} className={classes.button}>Sign Out</Button>
                </Link>
              </>:
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
                </>
            }
           </span>
        </Toolbar>
      </AppBar>
    );
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isNotepadShared: state.notepad.isNotepadShared,
  }
};


export default withStyles(style, { withTheme: true })(withRouter(connect(mapStateToProps)(NavigationBar)));