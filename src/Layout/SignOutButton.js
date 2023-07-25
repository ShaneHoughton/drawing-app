import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui";

const SignOutButton = () => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(uiActions.openSignOut());
  }

  return (
    <Button style={{ color: '#DEEFE7', fontWeight: 'bold'}} onClick={handleSignOut}>
      {"Sign Out ➡️"}
    </Button>
  );
}

export default SignOutButton;