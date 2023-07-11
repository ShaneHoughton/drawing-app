import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import ButtonRow from './ButtonRow';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import { useDispatch } from 'react-redux';
import { uiActions } from '../../store/ui';
import { storage } from '../../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { loadPostData } from '../../store/postActions';

const styles = {
  container: {
    width: '100%',
    height: '60vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: '100%',
    border: '2px solid blue',
    borderRadius: '0.5rem',
  },
};

// const canvasHeight = '100%'; // Set desired canvas height as a percentage of the window height

const Canvas = (props) => {
  const [imageUpload, setImageUpload] = useState(null);
  const canvas = useRef();
  const dispatch = useDispatch();

  const handleSaveImage = () => {
    console.log('sending image');
    if (canvas.current) {
      canvas.current.exportImage('png').then((data) => {
        const byteString = atob(data.split(',')[1]);
        const mimeString = data.split(',')[0].split(':')[1].split(';')[0];
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        for (let i = 0; i < byteString.length; i++) {
          uint8Array[i] = byteString.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: mimeString });

        // Set image upload state
        const file = new File([blob], 'sketch.png', { type: 'image/png' });
        setImageUpload(file);
      });
    }
  };

  useEffect(() => {
    const uploadImage = () => {
      if (!imageUpload) return;
      return new Promise((resolve, reject) => {
        const imageRef = ref(storage, `images/${v4() + imageUpload.name}`);
        uploadBytes(imageRef, imageUpload)
          .then(() => {
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
        dispatch(uiActions.toggleModal());
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    if (imageUpload) {
      handleImageUpload();
    }
  }, [imageUpload, dispatch]);

  return (
    <Modal onClose={() => dispatch(uiActions.toggleModal())}>
      <ReactSketchCanvas
        style={styles.canvas}
        height="20rem"
        strokeWidth={4}
        strokeColor="blue"
        ref={canvas}
      />

      {/* <button onClick={handleSaveImage}>Save Image</button>
      <button onClick={() => canvas.current.resetCanvas()}>Clear</button> */}
      <ButtonRow send={handleSaveImage} 
      clear={() => canvas.current.resetCanvas()}
      undo={() => canvas.current.undo()}
      redo={() => canvas.current.redo()}
      />
    </Modal>
  );
};

export default Canvas;
