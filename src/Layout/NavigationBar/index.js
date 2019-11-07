import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import style from "./style";
import { Link } from "react-router-dom";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" className={classes.appBar} color="secondary">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.toolbarTitle}>
            My Title
          </Typography>
          <span className={classes.toolbarLinks}>
            <Link to="/">
              <Typography variant="title" color="inherit">Home</Typography>
            </Link>
            <Link to="/signin">
              <Typography variant="title" color="inherit">Sign In</Typography>
            </Link>
            <Link to="/signup">
              <Typography variant="title" color="inherit">Sign Up</Typography>
            </Link>
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
};

export default withStyles(style, { withTheme: true })(NavigationBar);