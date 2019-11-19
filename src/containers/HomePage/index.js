import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import style from "./style";
import { connect } from 'react-redux'

class HomePage extends Component {

  render() {
    return (
      <div>
        <h1>HomePage</h1>
      </div>
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