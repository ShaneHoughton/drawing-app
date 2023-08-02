import { Button } from '@mui/material';
import classes from "../ModalForm.module.css";
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const DeletePost = (props) => {
  const dispatch = useDispatch();

  const deletePostHandler = async (e) =>{
    e.preventDefault();
    try{
      await deleteDoc(doc(db, "Posts", props.postId));
      dispatch(uiActions.showNotification({status: 'success', message:"Your post was deleted."}))
    }catch(error){
      dispatch(uiActions.showNotification({status: 'fail', message: error.message}))
    }
    props.onClose()
  };

  return (
    <form onSubmit={deletePostHandler} >
      <h3>Are you sure you want to delete your work?</h3>
      <h4>This cannot be undone</h4>
      <div className={classes['button-row']}>
        <Button type="submit" className={classes.formButton}>Yes</Button>
        <Button onClick={props.onClose} className={classes.formButton}>No</Button>
      </div>
    </form>
  )
}

export default DeletePost