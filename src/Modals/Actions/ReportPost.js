import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';
import classes from "../ModalForm.module.css";
import { useState } from 'react';
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

const reportReasons = [
  "Nudity or sexual activity",
  "Hate speech or symbols",
  "Bullying or harassment",
  "Inapropriate or upsetting"
]

const ReportPost =(props)=> {
  const [selectedReason, setSelectedReason] = useState(null);
  const dispatch = useDispatch();

  const handleReportPost = async () =>{
    const postRef = doc(db, "Posts", props.postId);
    try{
      await addDoc(collection(db, "Reported"), {
        creator: props.createdBy,
        creatorId: props.creatorId,
        imageLink: props.src,
        reason: selectedReason,
        reporter: props.user.displayName,
        reporterId: props.user.uid,
        title: props.title,
        timestamp: new Date().getTime()
      });

      await updateDoc(postRef, {
        reported: true
      });
     
      dispatch(uiActions.showNotification({status: 'success', message:"Post was submitted for review."}))
    }catch(error){
      dispatch(uiActions.showNotification({status: 'fail', message: error.message}))
    }
   props.onClose();
  }

  return (
    <div>
      <Paper 
      sx={{ width: 320, 
      display:'flex', 
      flexDirection: 'column', 
      alignItems:'center', 
      textAlign:'center', 
      backgroundColor:'#DEEFE7' }}>
      <h3>Reason for reporting</h3>
        <MenuList dense>
          {reportReasons.map((reason)=>(
          
            <MenuItem key={reason} onClick={()=>{setSelectedReason(reason)}}>
              {selectedReason === reason && <ListItemIcon>
                <CheckIcon fontSize='small'/>
              </ListItemIcon>
              }
              <ListItemText>{reason}</ListItemText>
              <Divider/>
            </MenuItem>


          ))}
        </MenuList>
        <div className={classes['button-row']}>
          <Button onClick={handleReportPost} className={classes.formButton}>Submit</Button>
      </div>
      </Paper>
      
    </div>

  );
}

export default ReportPost;