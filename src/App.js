
import Layout from "./Layout/Layout";
import PostContainer from "./Post/PostContainer";
import Canvas from './Modals/Canvas/Canvas';
import Auth from "./Modals/Auth/AuthModals";
import {useSelector} from 'react-redux';
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { loadPostData } from "./store/postActions";
import classes from './App.module.css';

import { collection, addDoc } from "firebase/firestore"; 
import { db } from "./firebase";

// require('dotenv').config();


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    // const tryThis = async () =>{
    //   try {
    //     const docRef = await addDoc(collection(db, "users"), {
    //       first: "Ada",
    //       last: "Lovelace",
    //       born: 1815
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    //   }
    //   tryThis();

    dispatch(loadPostData());
    }, [dispatch]);
 
  const showCanvas = useSelector(state=> state.ui.showCanvas);
  const showAuth = useSelector(state=> state.ui.showAuth);

  if(showCanvas || showAuth){
    document.documentElement.style.overflow = 'hidden'; // Prevent scrolling of the entire page
  } else {
    document.documentElement.style.overflow = ''; // Restore scrolling of the entire page
  }
  
  

  return (
    <>
    
    <Layout>
      <div className="App">
        {/* TODO: PUT AUTH IN HERE */}
        {showCanvas && <Canvas />}
        {showAuth && <Auth/>}
        <PostContainer className={classes.App}/>
       
      </div>
    </Layout>
    </>
  );
}

export default App;
