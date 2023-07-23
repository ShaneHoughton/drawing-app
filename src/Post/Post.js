import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import classes from "./Post.module.css";
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui';
import { auth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase";

const Post = (props) => { // TODO: refactor this...
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(null);
  const dispatch = useDispatch();
  const postId = props.id;
  const currentUser = auth.currentUser; 

  const likePost = () => { //Like button should be its own component?
    addDoc(collection(db, "Likes"), {
      postId: props.id,
      timestamp: Date.now(),
      userId: currentUser.uid,
      username: currentUser.displayName,
    }).then(() => {
      setIsLiked(true);
    });
  };

  const unlikePost = async () => {
    try {
      const collectionRef = collection(db, "Likes");
      const q = query(
        collectionRef,
        where("userId", "==", currentUser.uid),
        where("postId", "==", postId)
      );
      const querySnapshot = await getDocs(q); //There could be duplicates
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref).then(()=>{
          setIsLiked(false);
        });
      })
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleLikeButton = () => {
    if(!currentUser){
      dispatch(uiActions.openAuth());
      return;
    }
    
    if (!isLiked) {
      likePost();
      return
    }
    unlikePost();
    
   
  };

  let date = new Date(props.timeCreated).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const getLikes = async () => {
      const coll = collection(db, "Likes");
      const q = query(coll, where("postId", "==", postId));
      const snapshot = await getCountFromServer(q);
      setLikes(snapshot.data().count);
    };

    const checkIfUserLiked = async () => {
      if(currentUser) {
        const coll = collection(db, 'Likes');
        const q = query(coll, where('userId', '==', currentUser.uid), where('postId', '==', postId));
        const docSnap = await getDocs(q);
  
        if (!docSnap.empty) {
          // If there are matching documents, it means the user has liked the post
          docSnap.forEach((doc) => {
            setIsLiked(true);
          });
        } else {
          // If there are no matching documents, it means the user hasn't liked the post
          setIsLiked(false);
          
        }
      }
    };

    getLikes();
    checkIfUserLiked();
  }, [postId, isLiked, likes, currentUser]);

  return (
    <>
      <img src={props.url} alt={props.title} />
      <h2>{props.title}</h2>
      <div className={classes["post-items"]}>
        <div className={classes["post-info"]}>
          <h4>{props.createdBy}</h4>
          {date}
        </div>
        <div className={classes["post-buttons"]}>
          <div className={classes["labeled-button"]}>
            <IconButton
              color="secondary"
              onClick={handleLikeButton}
              style={{ marginTop: "0" }}>
              {!isLiked && <FavoriteBorderIcon fontSize="large" />}
              {isLiked && <FavoriteIcon fontSize="large" />}
            </IconButton>
            <span>{likes} Likes</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default  Post;
