import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import PasswordTextfield from './PasswordTextfield';
import Box from '@mui/material/Box';

import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
import { getAuth, setPersistence, browserLocalPersistence} from 'firebase/auth';


import classes from './SignIn.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import Modal from '../Modal';


const SignIn = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const dispatch = useDispatch();
 
 

  const signInHandler = (e) =>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // const user = userCredential.user;
      console.log('User signed in:', auth.currentUser.emailVerified);
      const user = auth.currentUser;
      if(!user.emailVerified){
        alert("Account is not yet verified. An email has been sent to verify.")
      }else{
        console.log(user.email);
        setPersistence(auth, browserLocalPersistence);
        dispatch(uiActions.closeAuth());
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error('Error signing in:', error);
      alert("Please enter a valid email and password")
    });
  }

  
  return (
    <Modal onClose={() => dispatch(uiActions.closeAuth())}>
      <form onSubmit={signInHandler} className={classes.signIn}>
        <h3>Sign in to your account</h3>
        <TextField
        label="Email" 
        id="email" 
        value={email} 
        onChange={(e) =>setEmail(e.target.value)}/>
       
        <PasswordTextfield 
          onChange={(e) =>setPassword(e.target.value)} 
          value={password}/>

        <Button type="submit" className={classes.signInButton}>Sign In</Button>
        <Button onClick={props.switchToRegister}>Register account</Button>
      </form>
    </Modal>
  )
}

export default SignIn