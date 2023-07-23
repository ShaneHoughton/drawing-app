import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { uiActions } from '../store/ui';
import { useDispatch } from 'react-redux';
import { auth } from "../firebase";

const SignOutButton = () => {
  const [signedIn, setSignedIn] = useState(auth.currentUser !== null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the signedIn state whenever the authentication state changes
    const updateSignedIn = auth.onAuthStateChanged((user) => {
      setSignedIn(user !== null);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => updateSignedIn();
  }, []);

  const handleButton = () => {
    if (signedIn) {
      signOut(auth);
      alert("You signed out of your account.");
    } else {
      dispatch(uiActions.openAuth());
    }
  };

  return (
    <Button style={{ color: '#DEEFE7' }} onClick={handleButton}>
      {signedIn ? "Sign Out➡️" : "Sign In➡️"}
    </Button>
  );
};

export default SignOutButton;
