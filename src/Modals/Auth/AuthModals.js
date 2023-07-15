import {useState} from 'react'; 
import SignIn from './SignIn';
import Register from './Register';

const AuthModals = () => {
  const [authState, setAuthState] = useState('signin');

  const switchToRegister = () =>{
    setAuthState('register');
  }

  const switchToSignIn = () =>{
    setAuthState('signin');
  }
  let authContent = <SignIn switchToRegister={switchToRegister}/>
  if(authState === 'register'){ 
    authContent = <Register switchToSignIn={switchToSignIn}/>
  }
  
  return (
    <>
      {authContent}
    </>
  )
}

export default AuthModals