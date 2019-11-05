import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import style from './style';
import { ListItem, ListItemText } from '@material-ui/core';
import { removeHTMLTags } from '../../utilities';

class SidebarItem extends React.PureComponent {

  selectNote = (n, i) => this.props.selectNote(n, i);

  render() {
    const { classes, index, note, noteSelectedId } = this.props;
    return(
      <div key={index}>
        <ListItem
          className={classes.listItem}
          selected={noteSelectedId === index}
          alignItems='flex-start'>
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(note, index)}>
            <ListItemText
              primary={note.title}
              secondary={removeHTMLTags(note.body.substring(0, 30)) + '...'}
            />
          </div>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(style)(SidebarItem);