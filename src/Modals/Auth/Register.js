import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
import classes from './SignIn.module.css';
import Modal from '../Modal';

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://shanehoughton.github.io/drawing-app/',
  // This must be true.
  handleCodeInApp: false
};

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  
  const registerHandler = (e) =>{
    e.preventDefault();
    console.log(email);
    console.log(password);

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      updateProfile(user, { displayName: username });
      sendEmailVerification(user, actionCodeSettings)
      .then(()=>{
        console.log("email sent");
        alert("A verification email was sent to the entered address.")
      })
      .catch((error)=>{
        console.log("error happening")
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        alert("An error ocdurred. Please try again.")
      })
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage);
      console.log("account with that email already exists")
      // ..
    });
    console.log("finish")

  }


  return (
    <Modal onClose={() => dispatch(uiActions.closeAuth())}>
      <form onSubmit={registerHandler} className={classes.signIn}>
        <h3>Register an Account</h3>
        <TextField
        label="Username"
        id="username" 
        value={username} 
        onChange={(e) =>setUsername(e.target.value)}/>

        <TextField
        label="Email" 
        id="email" 
        value={email} 
        onChange={(e) =>setEmail(e.target.value)}/>
        
        <TextField 
        label="Password" 
        id="password" 
        value={password} 
        onChange={(e) =>setPassword(e.target.value)}/>
        <Button type="submit" className={classes.signInButton}>Register</Button>
        <Button onClick={props.switchToSignIn}>Sign in</Button>
      </form>
    </Modal>

  )
}

export default Register