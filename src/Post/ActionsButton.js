import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ActionModal from '../Modals/Actions/ActionModal';

const options = [
  '✏️ Rename',
  '⚠️ Report',
  '🗑️ Delete'
];




const LongMenu = ()=> {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const open = Boolean(anchorEl);

  const handleAction = (action) =>{
    switch (action) {
      case options[0]:
        console.log('Action is rename');
        break;
      case options[1]:
        console.log('Action is report');
        break;
      case options[2]:
        console.log('Action is delete');
        handleClose();
        setShowActionModal(true);
        break;
      default:
        console.log('Action is unknown');
  }
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {showActionModal && <ActionModal onClose={()=>{setShowActionModal(false)}}/>}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color='primary'/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={()=>handleAction(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default LongMenu;