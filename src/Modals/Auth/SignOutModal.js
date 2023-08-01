import Modal from '../Modal';
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { uiActions } from '../../store/ui';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import classes from "../ModalForm.module.css";


const SignOutModal = () => {
  const dispatch = useDispatch();


  const close = () =>{
    dispatch(uiActions.closeSignOut());
  };

  const signOutHandler = () =>{
    try{
      signOut(auth);
      close();
      dispatch(uiActions.showNotification({status:'success', message: 'User successfully signed out.'}));
    }catch(error){
      dispatch(uiActions.showNotification({status: 'fail', message: error.message}));
    }
  };

  return (
    <Modal onClose={close}>
    <form onSubmit={signOutHandler} >
      <h3>Are you sure you want to sign out?</h3>
      <div className={classes['button-row']}>
        <Button type="submit" className={classes.formButton}>Yes</Button>
        <Button onClick={close} className={classes.formButton}>No</Button>
      </div>
    </form>
  </Modal>
  )
}

export default SignOutModal