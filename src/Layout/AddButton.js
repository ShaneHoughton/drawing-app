import { uiActions } from '../store/ui';
import { useDispatch } from 'react-redux';
import { Button } from "@mui/material";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AddButton = () => {
  const dispatch = useDispatch();
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsUserVerified(true);
      } else {
        setIsUserVerified(false);
      }
    });

  }, []);

  const openModalHandler = () => {
    if (!isUserVerified) {
      dispatch(uiActions.openAuth());
    } else {
      dispatch(uiActions.openCanvas());
    }
  };

  return (
    // <button onClick={openModalHandler} className={classes.button}>
    //   <span>Add a masterpiece</span>
    // </button>
    <Button style={{color: '#DEEFE7'}} onClick={openModalHandler}>Add a masterpiece  ✏️</Button>
    
  );
};

export default AddButton;
