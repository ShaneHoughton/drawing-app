import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const ProfileButton = () => {
  const userName = auth.currentUser.displayName;
  const handleClick = () =>{
    console.log("sign out");
    signOut(auth);
    alert("You have signed out.")
  }
  return (
    <Button style={{ color: '#DEEFE7' }} onClick={handleClick}>
      {userName}
    </Button>
  )
}

export default ProfileButton