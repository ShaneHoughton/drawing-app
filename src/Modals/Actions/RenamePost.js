import classes from "../ModalForm.module.css";
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const RenamePost = (props) => {
  const [title, setTitle] = useState(props.title);
  const dispatch = useDispatch();

  const handleRename = async () =>{
    const postRef = doc(db, "Posts", props.postId);
    try{
      await updateDoc(postRef, {
        title: title
      });
      dispatch(uiActions.showNotification({status: 'success', message:"Your title was updated!"}))
    }catch(error){

      dispatch(uiActions.showNotification({status: 'fail', message: error.message}))
    }
   props.onClose();
  }

  return (
    
      <div className={classes.imageBox}>
      <img src={props.src} alt={props.alt} />
      <TextField
        inputProps={{ maxLength: 37 }}
        style={{ width: '100%', backgroundColor: "rgba(255, 255, 255, 0.8)" }}
        id="outlined-required"
        label="Title"
        variant="filled"
        value={title}
        onChange={(e) => { setTitle(e.target.value); console.log(title) }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleRename}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ '& .MuiFilledInput-input': { flex: '1 1 auto' } }}
        />
      </div>
  );
};

export default RenamePost;
