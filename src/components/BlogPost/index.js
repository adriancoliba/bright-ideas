import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import style from './style';
import { Button, Paper, Avatar, Fade, Modal, Backdrop, Grid,
  Dialog, DialogContent, DialogContentText, DialogActions
} from '@material-ui/core';

class BlogPost extends React.PureComponent {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {

  }
  componentWillReceiveProps(nextProps, nextContext) {

  }


  render() {
    const { classes } = this.props;

    return (
      <div>

      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(BlogPost);