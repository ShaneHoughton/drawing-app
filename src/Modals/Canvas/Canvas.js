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
import { AddUploadedPost } from '../../store/postActions';


const Canvas = () => {
  const [imageTitle, setImageTitle] = useState('My Masterpiece')
  const canvas = useRef();
  const dispatch = useDispatch();
  
  
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

    console.log(auth.currentUser);
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
      await uploadBytes(imageRef+"jojoj", file, metadata);
      }
      catch(error){
        console.log(error);
        alert("There was an error uploading your image!");
        dispatch(uiActions.showNotification({status: 'fail', message: "There was an error uploading your image!"}))
        return
      }

    const downloadURL = await getDownloadURL(imageRef);

    const docRef = await addDoc(collection(db, "Posts"), {
      title: imageTitle,
      creator: createdBy,
      date: timestamp,
      likedBy: [],
      imgLink: downloadURL,
      reported: false
    })

    // dispatch(loadPostData())// ADD IT HERERERERER
    console.log(docRef)
    dispatch(AddUploadedPost(docRef));
   
    dispatch(uiActions.closeCanvas()); 
    dispatch(uiActions.showNotification({status: 'success', message: "Your masterpiece was submitted!"}))
  }


  return (
  
    
    <Modal onClose={()=>{dispatch(uiActions.closeCanvas())}}>
      <div className={classes.border}>
        <div className={classes['canvas-container']}>
        <ReactSketchCanvas
          /* Add your canvas props here */
          strokeWidth={4}
          strokeColor="blue"
          ref={canvas}
        />
      </div>
      <div className={classes['canvas-tools']}>
      <ButtonRow send={handleSaveImage} 
      clear={() => canvas.current.resetCanvas()}
      undo={() => canvas.current.undo()}
      redo={() => canvas.current.redo()}
      />
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
  
    
  );
};

export default Canvas;
