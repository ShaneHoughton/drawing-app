import React, { useEffect, useRef, useState } from 'react';
import Modal from '../Modal';
import ButtonRow from './ButtonRow';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { v4 } from 'uuid';
import { loadPostData } from '../../store/postActions';
import { getAuth } from 'firebase/auth';
import classes from './Canvas.module.css';


import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../firebase';
import TextField from '@mui/material/TextField';




const Canvas = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageTitle, setImageTitle] = useState('My Masterpiece')
  const [isUploadCompleted, setIsUploadCompleted] = useState(false);
  const canvas = useRef();
  const dispatch = useDispatch();

  
  const handleSaveImage = () => {
    console.log('sending image');
    if(imageTitle.length < 50){
      

    if (canvas.current) {
      

      const auth = getAuth();
      console.log(auth.currentUser);
      const userId = auth.currentUser.uid; // Replace with actual user ID
      const createdBy = auth.currentUser.displayName;
      const timestamp = new Date().getTime();
      canvas.current.exportImage('svg').then((data) => {
        const byteString = atob(data.split(',')[1]);
        const mimeString = data.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: mimeString });

        // Set image upload state
        const file = new File([blob], 'sketch', { type: 'image/png' });
        // const file = new File(data, 'sketch', { type: 'image/svg' });
        setImageUpload({ name: v4(), file, userId, createdBy, timestamp });
      });
    }
  }
  };

  

  useEffect(() => {
    const uploadImage = () => {
      if (!imageUpload) return;
      return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `images/${imageUpload.timestamp}_${imageUpload.createdBy}_${imageUpload.userId}_${imageUpload.name}`);
    
        const metadata = {
          customMetadata: {
            userId: imageUpload.userId,
            timestamp: imageUpload.timestamp,
            createdBy: imageUpload.createdBy
          },
        };
    
        uploadBytes(imageRef, imageUpload.file, metadata)
          .then(() => {
            getDownloadURL(imageRef).then((downloadURL)=>{
              addDoc(collection(db, "Posts"), {
                title: imageTitle,
                creator: imageUpload.createdBy,
                date: imageUpload.timestamp,
                likedBy: [],
                imgLink: downloadURL
              });
            })
            resolve();
          })
          .catch((error) => {
            reject(error);
          });

      });
    };
    
    const handleImageUpload = async () => {
      try {
        await uploadImage();
        dispatch(loadPostData());
        canvas.current.clearCanvas();
        dispatch(uiActions.closeCanvas());
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    if (imageUpload) {
      handleImageUpload().then(()=>{
        setIsUploadCompleted(true);
      })
    }
  }, [imageUpload, imageTitle, dispatch]);

  useEffect(() => {
    // When isUploadCompleted becomes true, we refresh the page to show the uploaded image
    if (isUploadCompleted) {
      window.location.reload();
    }
  }, [isUploadCompleted]);

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
