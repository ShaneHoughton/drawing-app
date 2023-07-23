import {useState} from 'react'; 
import SignIn from './SignIn';
import Register from './Register';
import { auth } from '../../firebase';

const AuthModals = () => {
  const [authState, setAuthState] = useState('signin');

  const switchToRegister = () =>{
    setAuthState('register');
  }

  const switchToSignIn = () =>{
    setAuthState('signin');
  }

  let authContent = <SignIn auth={auth} switchToRegister={switchToRegister}/>
  if(authState === 'register'){ 
    authContent = <Register auth={auth} switchToSignIn={switchToSignIn} />
  }
  
  
  return (
    <>
      {authContent}
    </>
  )
}

export default AuthModals