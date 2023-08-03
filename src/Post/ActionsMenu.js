import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { auth } from "../firebase";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui';

const ActionsMenu = (props)=> {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const [isUserVerified, setIsUserVerified] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (option) =>{
    handleCloseMenu();
    if(!isUserVerified){
      dispatch(uiActions.openAuth());
      return;
    }
    props.actionStateHandler(option)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsUserVerified(true);
      } else {
        setIsUserVerified(false);
      }
    });

  }, []);
  
  const options = [
    auth.currentUser?.uid === props.creatorId && {label: '✏️ Rename', value: 'RENAME'},
    {label: '⚠️ Report', value:'REPORT'},
    auth.currentUser?.uid === props.creatorId && {label:'🗑️ Delete', value: 'DELETE'}
  ].filter(Boolean);

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOpenMenu}
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
        onClose={handleCloseMenu}
      >
        {options.map((option) => (
              <MenuItem key={option.value} selected={option === 'Pyxis'} onClick={()=>handleOpenModal(option.value)}>
                {option.label}
              </MenuItem>
        )
        )}
      </Menu>
    </div>
  );
}

export default ActionsMenu;