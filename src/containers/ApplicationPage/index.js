import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";

class ApplicationPage extends Component {
  render() {
    return (
      <div>
        <Link to={'/notepad'}><h1>Go to Notepad</h1></Link>
        <Link to={'/profile'}><h1>Go to Profile</h1></Link>
      </div>
    );
  }
}

ApplicationPage.propTypes = {};

const mapStateToProps = (state) => {
  return {
    isUserAuthenticated: state.auth.isUserAuthenticated,
  }
};

export default connect(mapStateToProps)(withStyles(style, { withTheme: true })(ApplicationPage));