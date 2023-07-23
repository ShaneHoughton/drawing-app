import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const SignOutButton = () => {
  
  const handleSignOut = () => {
    signOut(auth);
  }

  return (
    <Button style={{ color: '#DEEFE7', fontWeight: 'bold'}} onClick={handleSignOut}>
      {"Sign Out ➡️"}
    </Button>
  );
}

export default SignOutButton;