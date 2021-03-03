import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip';

import { useContext, useState, useEffect } from 'react';
import { BoardContext } from '../../../contexts/board-context';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  menu: {

  },
  ballColor:
  {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'red'
  } 
}));

export const colors = ['#EEEEEE', '#388E3C', '#FBC02D', '#0288D1', '#7B1FA2', '#E64A19']

export default function PriorityTask({color, id}) {

  const classes = useStyles();

  const { board, setboard } = useContext(BoardContext);
  
  const [onpriorityColor, setonpriorityColor] = useState(color || '#EEEEEE')

  const [anchorEl, setAnchorEl] = useState(null);
 
  const handleClose = (e, cPriority) => {
    e.stopPropagation();
    setonpriorityColor(cPriority);
 
    setboard({...board, cards: board.cards.map(c => ({ ...c, tasks: c.tasks.map(t => t.id === id ? {...t, priority: colors.indexOf(cPriority) } : t) })) })

    setAnchorEl(null);
  };

  const handleCloseMenu = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  }
  

  const onPriority = event => {
    setAnchorEl(event.currentTarget)
  }

 


  return (
    <>
      <Tooltip title="Priority" >
        <IconButton aria-label="priority" onMouseOver={onPriority} >
          <span className={classes.ballColor} style={{backgroundColor: onpriorityColor}}></span>
        </IconButton>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {
          colors.map(c => <MenuItem onClick={(e) => handleClose(e, c)}> <span className={classes.ballColor} style={{backgroundColor: c}}>  </span> </MenuItem>)
        }
        
      </Menu>
    </>
  )
}