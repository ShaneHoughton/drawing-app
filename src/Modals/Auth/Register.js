import { useState } from 'react';
import { Button } from '@mui/material';
import PasswordTextfield from './PasswordTextfield';
import CustomTextfield from './CustomTexfield';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
import classes from './SignIn.module.css';
import Modal from '../Modal';

const actionCodeSettings = {//TODO: Move this
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: 'https://shanehoughton.github.io/drawing-app/',
  handleCodeInApp: false
};

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  
  const registerHandler = (e) =>{
    e.preventDefault();
    if(username.length > 20){
      alert("Username is too long. Must be less than 20 characters") //TODO: improve this.
      return
    }
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
      alert("Inavlid email or password.")
      // ..
    });
    console.log("finish")

  }


  return (
    <Modal onClose={() => dispatch(uiActions.closeAuth())}>
      
        <form onSubmit={registerHandler} className={classes.signIn}>
          <h3>Register an account</h3>

          <CustomTextfield
          label={"Username"} 
          onChange={(e) =>setUsername(e.target.value)} 
          value={username}
          adornment={<PermIdentityIcon/>}
          />
          
          <CustomTextfield
          label={"Email"} 
          onChange={(e) =>setEmail(e.target.value)} 
          value={email}
          adornment={<MailOutlineIcon/>}
          />
       
          <PasswordTextfield 
          label={'Password'}
          onChange={(e) =>setPassword(e.target.value)} 
          value={password}/>

          <Button type="submit" className={classes.signInButton}>Register</Button>
          <Button onClick={props.switchToSignIn}>Sign in</Button>
        </form>
    </Modal>

  )
}

export default Register