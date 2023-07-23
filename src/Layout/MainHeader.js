import AddButton from './CreateButton';
import ProfileButton from './ProfileButton';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import classes from './MainHeader.module.css';
import { auth } from "../firebase";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';


const MainHeader = (props) => {
  const [signedIn, setSignedIn] = useState(auth.currentUser !== null);
  const navigate = useNavigate();
  useEffect(()=>{
    const updateSignedIn = auth.onAuthStateChanged((user) => {
      setSignedIn(user !== null);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => updateSignedIn();
  }, [])

  let authButton = <SignInButton />

  if(signedIn){
    authButton =(
      <Routes>
            <Route path="/user" element={<SignOutButton />}/>
            <Route path="/" element={<ProfileButton />}/>
      </Routes>
    )
  }


  return (
    <header className={classes.header}>
      <h1 onClick={()=>{navigate('/drawing-app')}} style={{cursor:'pointer'}}>Sketchi.io</h1>
      <nav>
        <ul>
          <li>
            <AddButton />
          </li>
          <li>
            {authButton}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;