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
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import { Menu, MenuItem } from "@material-ui/core";
import {isMobile} from 'react-device-detect';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      anchorEl: null,
    }
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onSignOut = () => {
    const { dispatch } = this.props;
    dispatch(setUserDeAuthenticated())
  };

  render() {
    const { classes, isUserAuthenticated, isNotepadShared } = this.props;
    const { pathname } = this.props.location;

    return (
      <AppBar position="static" className={classes.appBar} color="secondary">
        {window.innerWidth > 700 ?
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
                  <Button variant={pathname === '/signin' ? 'outlined' : 'text'} className={classes.button}>Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button variant={pathname === '/signup' ? 'outlined' : 'text'} className={classes.button}>Sign Up</Button>
                </Link>
                <Link to="/demo">
                  <Button variant={pathname === '/demo' ? 'outlined' : 'text'} className={classes.button}>Demo</Button>
                </Link>
              </>
            }
           </span>
          </Toolbar>
          :
          <Toolbar>
            <img src={LogoIdea} width={38} className={classes.logoIcon} alt=''/>
            <Typography variant="h5" color="inherit" className={classes.logoText} component={'span'}>
              Bright Ideas
            </Typography>
            <MenuRoundedIcon className={classes.menuBurgerIcon} onClick={this.handleMenu}/>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
              className={classes.menuPaper}
            >
              { checkUserAuth(isUserAuthenticated) ?
                <div>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/">
                      <Badge color="primary"
                             badgeContent={isNotepadShared}
                             className={isNotepadShared ? classes.badge : null}>
                        <Button variant={pathname === '/' ? 'outlined' : 'text'} className={classes.button}>Blog</Button>
                      </Badge>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/notepad">
                      <Button variant={pathname === '/notepad' ? 'outlined' : 'text'}  className={classes.button}>Notepad</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/profile">
                      <Button variant={pathname === '/profile' ? 'outlined' : 'text'}  className={classes.button}>Profile Settings</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/">
                      <Button onClick={this.onSignOut} className={classes.button}>Sign Out</Button>
                    </Link>
                  </MenuItem>
                </div>
                :
                <div>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/">
                      <Button variant={pathname === '/' ? 'outlined' : 'text'} className={classes.button}>Home</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/signin">
                      <Button variant={pathname === '/signin' ? 'outlined' : 'text'}  className={classes.button}>Sign In</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/signup">
                      <Button variant={pathname === '/signup' ? 'outlined' : 'text'}  className={classes.button}>Sign Up</Button>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/demo">
                      <Button variant={pathname === '/demo' ? 'outlined' : 'text'}  className={classes.button}>Demo</Button>
                    </Link>
                  </MenuItem>
                </div>
              }
            </Menu>
          </Toolbar>
        }
      </AppBar>
    );
  }
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool,
  isNotepadShared: PropTypes.bool,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isNotepadShared: state.notepad.isNotepadShared,
  }
};


export default withStyles(style, { withTheme: true })(withRouter(connect(mapStateToProps)(NavigationBar)));