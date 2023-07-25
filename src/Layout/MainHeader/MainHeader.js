import AddButton from './CreateButton';
import ProfileButton from './ProfileButton';
import SignInButton from './SignInButton';
import SignOutButton from './SignOutButton';
import HomeButton from './HomeButton';
import classes from './MainHeader.module.css';
import { auth } from "../../firebase";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Notification from '../Notification/NotificationBanner';


const MainHeader = (props) => {
  const [signedIn, setSignedIn] = useState(auth.currentUser !== null);
  const navigate = useNavigate();
  useEffect(()=>{
    const updateSignedIn = auth.onAuthStateChanged((user) => {
      setSignedIn(user !== null && user.emailVerified);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => updateSignedIn();
  }, [])

  let authButton = <SignInButton />;
  let mobileAuthButton = <SignInButton />;

  if(signedIn){
    authButton =(
      <Routes>
            <Route path="/drawing-app/user" element={<SignOutButton />}/>
            <Route path="/drawing-app" element={<ProfileButton />}/>
      </Routes>
    )

    mobileAuthButton = (
      <SignOutButton />
    )
  }




  return (
    <>
    <header className={classes.header}>
      <h1 onClick={()=>{navigate('/drawing-app')}} style={{cursor:'pointer'}}>Sketchi.io</h1>
      <nav>
        <ul>
          <li>
            <HomeButton />
          </li>
          <li>
            <AddButton />
          </li>
          <li>
            {authButton}
          </li>
        </ul>
      </nav>
      <div className={classes['mobile-signin']}>
        {mobileAuthButton}
      </div>
    </header>
    <Notification />
    </>
  );
};

export default MainHeader;