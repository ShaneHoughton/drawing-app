import Modal from '../Modal';
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { uiActions } from '../../store/ui';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import classes from "./Auth.module.css";


const SignOutModal = () => {
  const dispatch = useDispatch();

  const signOutHandler = () =>{
    signOut(auth);
  };

  const close = () =>{
    dispatch(uiActions.closeSignOut())
  };

  return (
    <Modal onClose={close}>
    <form onSubmit={signOutHandler} className={classes.signIn}>
      <h3>Are you sure you want to sign out?</h3>
      <div className={classes['button-row']}>
        <Button type="submit" className={classes.signInButton}>Yes</Button>
        <Button onClick={close} className={classes.signInButton}>No</Button>
      </div>
    </form>
  </Modal>
  )
}

export default SignOutModal