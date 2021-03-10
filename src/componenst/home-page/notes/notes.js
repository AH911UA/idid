import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {NotesItem} from './notes-item';

import {NotesContext} from '../../../contexts/notes-context';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '75vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },
}));

export default function Notes() {
  const classes = useStyles();
  
  const {notes, setnotes} = useContext(NotesContext);
  

  return (
    <div className={classes.root}>
        <NotesItem/>
        {
            notes.map(n => <NotesItem key={n.id} id={n.id} _text={n.text} date={n.date}/>)
        }
    </div>
  );
}
