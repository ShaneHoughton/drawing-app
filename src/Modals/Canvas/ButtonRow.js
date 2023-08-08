import React from 'react'
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Undo from '@mui/icons-material/Undo';
import Redo from '@mui/icons-material/Redo';
import classes from './ButtonRow.module.css';

const ButtonRow = (props) => {
  return (
    <div className={classes.buttonRow}>
      <IconButton color="primary" aria-label="send" onClick={props.send}>
        <Send fontSize='large'/>
      </IconButton>
      <IconButton color="secondary" aria-label="clear" onClick={props.clear}>
        <DeleteIcon fontSize='large'/>
      </IconButton>
      <IconButton color="secondary" aria-label="undo" onClick={props.undo}>
        <Undo fontSize='large'/>
      </IconButton>
      <IconButton color="secondary" aria-label="redo" onClick={props.redo}>
        <Redo fontSize='large'/>
      </IconButton>
    </div>
  )
}

export default ButtonRow