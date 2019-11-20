import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import style from './style';
import {
  Button, Paper, Avatar, Fade, Modal, Backdrop, Grid, Typography, Divider, Box,
  Dialog, DialogContent, DialogContentText, DialogActions, ListItem, ListItemText
} from '@material-ui/core';
import {removeHTMLTags} from "../../utils/utilities";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {iconsObject} from "../AvatarUser/imports";
import parse from 'html-react-parser';

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
    const { classes, post } = this.props;
    const dateParsed = post.date.toDate().toLocaleDateString('en-GB',
      { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const postBodyParsed = parse(post.body.substring(0, 200));
    return (
      <div key={post.id}>
        <Paper className={classes.paper}>
          <Typography variant="subtitle1" color={'secondary'}>{post.displayName}</Typography>
          <Divider/> <Box m={2} />
          <Typography variant="body1" className={classes.primaryDarkColor}>{post.title}</Typography>
          <Typography variant="body2" component={'span'} >{postBodyParsed}{post.body.length > 199 && ' ...'}</Typography>
          <Box m={2} /> <Divider/> <Box m={2} />
          <Typography variant="caption">{dateParsed}</Typography>
        </Paper>
      </div>
    )
  }
}

export default withStyles(style, { withTheme: true })(BlogPost);