import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
const SignOutButton = () => {

  const signOutHandler = () =>{
    const auth = getAuth();
    signOut(auth);
    alert("You signed out of your account.")
    console.log(auth.currentUser);
  }
  return (
    <Button style={{color: '#DEEFE7'}} onClick={signOutHandler}>Sign Out➡️</Button>
  )
}

export default SignOutButton