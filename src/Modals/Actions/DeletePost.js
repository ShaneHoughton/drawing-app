import { Button } from '@mui/material';
import classes from "../ModalForm.module.css";

const DeletePost = (props) => {
  

  const deletePostHandler = () =>{
   console.log("delete post")
  };

  return (
    <form onSubmit={deletePostHandler} >
      <h3>Are you sure you want to delete your work?</h3>
      <div className={classes['button-row']}>
        <Button type="submit" className={classes.formButton}>Yes</Button>
        <Button onClick={props.onClose} className={classes.formButton}>No</Button>
      </div>
    </form>
  )
}

export default DeletePost