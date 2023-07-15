import React from 'react'
import IconButton from '@mui/material/IconButton';
import Send from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Undo from '@mui/icons-material/Undo';
import Redo from '@mui/icons-material/Redo';

const ButtonRow = (props) => {
  return (
    <>
      <IconButton color="primary" aria-label="send" onClick={props.send}>
        <Send />
      </IconButton>
      <IconButton color="secondary" aria-label="clear" onClick={props.clear}>
        <DeleteIcon />
      </IconButton>
      <IconButton color="secondary" aria-label="undo" onClick={props.undo}>
        <Undo />
      </IconButton>
      <IconButton color="secondary" aria-label="redo" onClick={props.redo}>
        <Redo />
      </IconButton>
    </>
  )
}

export default ButtonRow