import AddButton from './AddButton';
import ProfileButton from './ProfileButton';
import SignInButton from './SignInButton';
import classes from './MainHeader.module.css';
import { auth } from "../firebase";
import {useState, useEffect} from 'react';

const MainHeader = (props) => {
  const [signedIn, setSignedIn] = useState(auth.currentUser !== null);

  useEffect(()=>{
    const updateSignedIn = auth.onAuthStateChanged((user) => {
      setSignedIn(user !== null);
    });

    // Unsubscribe from the listener when the component unmounts
    return () => updateSignedIn();
  }, [])

  let authButton = (
    <SignInButton auth={props.auth} />
  );

  if (signedIn){
    authButton = <ProfileButton/>
  }

  return (
    <header className={classes.header}>
      <h1>Sketchi.io</h1>
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