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
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';


const MainHeader = (props) => {
  const [signedIn, setSignedIn] = useState(auth.currentUser !== null);
  const navigate = useNavigate()
  const dispatch = useDispatch();
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
            <Route path="/user" element={<SignOutButton />}/>
            <Route path="/" element={<ProfileButton />}/>
      </Routes>
    )

    mobileAuthButton = (
      <SignOutButton />
    )
  }




  return (
    <>
    <header className={classes.header}>
      <h1 
      onClick={()=>{
        if (location.pathname !== '/') {
          dispatch(uiActions.clearPosts());
          navigate('/');
        }
      }}
       style={{cursor:'pointer'}}>Sketchi.io</h1>
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