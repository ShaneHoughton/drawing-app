import { Button } from "@mui/material";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";


const ProfileButton = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleClick = () =>{
    dispatch(uiActions.clearPosts());
    navigate('/user');
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUsername(user.displayName);
      } else {
        // User is signed out
        // Redirect to the homepage
        navigate('/');
      }
    });
    return () => unsubscribe();

  }, [navigate]);

  return (
    <Button style={{ color: '#DEEFE7', fontWeight: 'bold'  }} onClick={handleClick}>
      {username} 👨‍🎨
    </Button>
  )
}

export default ProfileButton;