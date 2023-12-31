import React, { useRef, useState } from 'react';
import Modal from '../Modal';
import ButtonRow from './ButtonRow';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { v4 } from 'uuid';
import { auth } from '../../firebase';
import classes from './Canvas.module.css';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import TextField from '@mui/material/TextField';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@mui/material";
import { AddUploadedPost } from '../../store/postActions';
import { HuePicker } from 'react-color'



const Canvas = () => {
  const [imageTitle, setImageTitle] = useState('My Masterpiece');
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [color, setColor] = useState("#0000ff");

 
  const canvas = useRef();
  const dispatch = useDispatch();

  const handleColorChange = (color, event) => {
    setColor(color.hex);
  };

  
  const toggleCloseModal = () =>{
    setShowCloseModal(!showCloseModal);
  }
  
  const createImageFile = async (canvas) =>{
    const data = await canvas.current.exportImage('png');
    const byteString = atob(data.split(',')[1]);
    const mimeString = data.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: mimeString });
    const file = new File([blob], 'sketch', { type: 'image/png' });
    return file;
  }

  const handleSaveImage = async () =>{
    if(imageTitle.length > 37){
      dispatch(uiActions.showNotification({status: 'fail', message: "Your title is too long."}))
      return
    }
    if(!canvas.current){
      return
    }

    const userId = auth.currentUser.uid; // Replace with actual user ID
    const createdBy = auth.currentUser.displayName;
    const timestamp = new Date().getTime();
    const name = v4();
    const file = await createImageFile(canvas);
    const imageRef = ref(storage, `images/${timestamp}_${createdBy}_${userId}_${name}`);

    const metadata = {
      customMetadata: {
        userId: userId,
        timestamp: timestamp,
        createdBy: createdBy
      },
    };

    try{
      setIsUploading(true);
      await uploadBytes(imageRef, file, metadata);
      }
      catch(error){
        console.log(error);
        alert("There was an error uploading your image!");
        dispatch(uiActions.showNotification({status: 'fail', message: "There was an error uploading your image!"}));
        return
      }

    const downloadURL = await getDownloadURL(imageRef);

    const docRef = await addDoc(collection(db, "Posts"), {
      title: imageTitle,
      creator: createdBy,
      creatorId: userId,
      date: timestamp,
      likedBy: [],
      imgLink: downloadURL,
      reported: false,
      fullPath: imageRef.fullPath
    })

    console.log(docRef)
    dispatch(AddUploadedPost(docRef));
   
    dispatch(uiActions.closeCanvas());
    setIsUploading(false); 
    dispatch(uiActions.showNotification({status: 'success', message: "Your masterpiece was submitted!"}))
  }

  return (
    <>
    {showCloseModal && <Modal onClose={toggleCloseModal}>
      <form>
        <h3>Are you sure you want to abandon this masterpiece?</h3>
        <div className={classes['button-row']}>
          <Button 
          onClick={()=>{
            toggleCloseModal();
            dispatch(uiActions.closeCanvas());
          }} className={classes.formButton}>Yes</Button>
          <Button 
          onClick={toggleCloseModal}
          className={classes.formButton}>No</Button>
        </div>
      </form>
    </Modal>}

    <Modal onClose={()=>{}}>
      <IconButton 
      color="secondary" 
      aria-label="close" 
      onClick={toggleCloseModal} 
      sx={{position:'absolute'}}>
        <CloseIcon/>
      </IconButton>
      <div className={classes.border}>

        <ReactSketchCanvas className={classes['canvas-container']}
          /* Add your canvas props here */
          strokeWidth={4}
          strokeColor={color}
          ref={canvas}
        />
     
      <div className={classes['canvas-tools']}>
      {!isUploading &&
      <ButtonRow 
      send={handleSaveImage} 
      clear={() => canvas.current.resetCanvas()}
      undo={() => canvas.current.undo()}
      redo={() => canvas.current.redo()}
      />
      }
      <HuePicker color={color} onChange={handleColorChange} />
      
      </div>
      <TextField
          inputProps={{ maxLength: 37 }}
          style={{width:'100%', backgroundColor:"rgba(255, 255, 255, 0.8)"}}
          id="outlined-required"
          label="Title"
          variant="filled"
          value={imageTitle}
          onChange={(e)=>{setImageTitle(e.target.value); console.log(imageTitle)}}
        />
      </div>
    </Modal>
    </>
    
  );
};

export default Canvas;
