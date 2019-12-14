import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import style from "./style";
import globalStyle from "../../utils/globalStyle";

function DemoPage ({ classes }){
  const id = '80594_dqIcQ';

  return (
    <div style={{
          position: "relative",
          height: '100vh',
          width: '100%',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: -50,
          bottom: 0,
          width: '90vw',
          height: '80vh',
          left: 0,
          right: 0,
          margin: 'auto',
        }}
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder={'0'}
        title={'demo yt'}
      />
    </div>
  )
}

DemoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles((theme) => ({
  ...style(theme),
  ...globalStyle(theme),
}), { withTheme: true })(connect()(DemoPage));