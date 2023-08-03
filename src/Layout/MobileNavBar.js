import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui';
import classes from './MobileNavBar.module.css';


const  MobileNavBar = () => {
  const [value, setValue] = useState(0);
  const [isUserVerified, setIsUserVerified] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navStyle = { color: 'rgba(222, 239, 231, .6)', '&.Mui-selected': { color: '#FFFFFF', fontWeight:'bold' }};
  const boxStyle = { width: "100%", position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10, borderTop:"#B4BEC9 .5px solid" };
  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsUserVerified(true);
      } else {
        setIsUserVerified(false);
      }
    });

    const storedValue = localStorage.getItem('navPosition');
    if (storedValue) {
      setValue(parseInt(storedValue, 10));
    }

  }, []);

  useEffect(() => { // for retrieving the navBar's previous value.
    localStorage.setItem('navPosition', value);
  }, [value]);


  return (
    <Box sx={boxStyle} className={classes['mobile-nav-bar']}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          switch (newValue) {
            case 0:
              console.log('Home icon clicked');
              setValue(newValue);
              navigate('/');
              break;
            case 1:
              console.log('Create icon clicked');
              if (!isUserVerified) {
                dispatch(uiActions.openAuth());
              } else {
                dispatch(uiActions.openCanvas());
              }
              break;
            case 2:
              console.log('Profile icon clicked');
              if (!isUserVerified) {
                dispatch(uiActions.openAuth());
              } else {
                setValue(newValue);
                navigate('/user');
              }
              
              break;
            default:
              break;
          }
        }}
        style={{ backgroundColor: '#002333', borderColor:"#FFFFFF"}}
      >
        <BottomNavigationAction label="HOME" icon={<>🏠</>} sx={navStyle}/>
        <BottomNavigationAction label="CREATE" icon={<>✏️</>} sx={navStyle}/>
        <BottomNavigationAction label="PROFILE" icon={<>👨‍🎨</>} sx={navStyle}/>
      </BottomNavigation>
    </Box>
  );
}

export default MobileNavBar;