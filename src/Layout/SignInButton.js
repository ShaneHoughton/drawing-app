import { Button } from "@mui/material";
import { uiActions } from '../store/ui';
import { useDispatch } from 'react-redux';

const SignInButton = () => {
  const dispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(uiActions.openAuth());
  }

  return (
    <Button style={{ color: '#DEEFE7', fontWeight: 'bold' }} onClick={handleSignIn}>
      {"Sign In ⬅️"}
    </Button>
  );
};

export default SignInButton;
