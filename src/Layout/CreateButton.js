import { uiActions } from '../store/ui';
import { useDispatch } from 'react-redux';
import { Button } from "@mui/material";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const CreateButton = () => {
  const dispatch = useDispatch();
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    
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
    <Button style={{color: '#DEEFE7', fontWeight: 'bold' }} onClick={openModalHandler}>Create ✏️</Button>
  );
};

export default CreateButton;
