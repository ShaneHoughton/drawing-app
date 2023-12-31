import {useState} from 'react'
import { storage } from './firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from "uuid";

const ImageUploader = () => {
  const [imageUpload, setImageUpload] = useState(null);

  const uploadImage = () =>{
    if(imageUpload === null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    uploadBytes(imageRef, imageUpload).then(()=>{
      alert("Image uploaded")
    })

  }
  return (
    <>
      <input type="file" onChange={(event)=>{setImageUpload(event.target.files[0])}}/>
      <button onClick={uploadImage}>Upload</button>
    </>
  )
}

export default ImageUploader;