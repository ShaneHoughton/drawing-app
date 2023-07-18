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
    <Button style={{color: '#DEEFE7'}} onClick={openModalHandler}>Create✏️</Button>
  );
};

export default AddButton;
