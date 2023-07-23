import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui';
import {
  collection,
  addDoc,
  query,
  where,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";
import { db } from "../firebase";

const LikeButton = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const currentUser = auth.currentUser;
  const postId = props.postId;
  const dispatch = useDispatch();

  const likePost = () => { //Like button should be its own component?
    addDoc(collection(db, "Likes"), {
      postId: postId,
      timestamp: Date.now(),
      userId: currentUser.uid,
      username: currentUser.displayName,
    }).then(() => {
      setIsLiked(true);
      props.onLike(true);
    }).catch((error)=>{
      console.log(error);
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
          props.onLike(false); // will handle if duplicates cause negative number
        });
      })
      
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleLikeButton = () => {
    if(!currentUser && !isUserVerified){
      dispatch(uiActions.openAuth());
      return;
    }
    
    if (!isLiked) {
      likePost();
      return
    }
    unlikePost();
   
  };

  useEffect(() => {
    const checkIfUserLiked = async () => {
      if(auth.currentUser) {
        const coll = collection(db, 'Likes');
        const q = query(coll, where('userId', '==', auth.currentUser.uid), where('postId', '==', postId));
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

    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsUserVerified(true);
      } else {
        setIsUserVerified(false);
      }
    });

    checkIfUserLiked();
  }, [postId, isLiked, currentUser]);

  return (
      <IconButton
        color="secondary"
        onClick={handleLikeButton} //TODO: Fix
        style={{ marginTop: "0" }}>
        {!isLiked && <FavoriteBorderIcon fontSize="large" />}
        {isLiked && <FavoriteIcon fontSize="large" />}
      </IconButton>
  )
}

export default LikeButton