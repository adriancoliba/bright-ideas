import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import style from "./style";

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

export default withStyles(style, { withTheme: true })(HomePage);