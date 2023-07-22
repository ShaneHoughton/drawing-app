import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import classes from "./Post.module.css";

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
import { getAuth } from "firebase/auth";

const Post = (props) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(null);
  const postId = props.id;

  const likePost = (auth) => {
    addDoc(collection(db, "Likes"), {
      postId: props.id,
      timestamp: Date.now(),
      userId: auth.currentUser.uid,
      username: auth.currentUser.displayName,
    }).then(() => {
      setIsLiked(true);
    });
  };

  const unlikePost = async (auth) => {
    try {
      const collectionRef = collection(db, "Likes");
      const q = query(
        collectionRef,
        where("userId", "==", auth.currentUser.uid),
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
    const auth = getAuth();
    try {
      if (!isLiked) {
        likePost(auth);
      } else {
        unlikePost(auth);
      }
    } catch (error) {
      alert("log in.");
      console.log(error);
    }
  };

  let date = new Date(props.timeCreated).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    const auth = getAuth();

    const getLikes = async () => {
      const coll = collection(db, "Likes");
      const q = query(coll, where("postId", "==", postId));
      const snapshot = await getCountFromServer(q);
      setLikes(snapshot.data().count);
    };

    const checkIfUserLiked = async () => {
      try {
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
      } catch (error) {
        console.error('Error checking if user liked the post:', error);
      }
    };

    getLikes();
    checkIfUserLiked();
  }, [postId, isLiked, likes]);

  return (
    <>
      <img src={props.url} alt={props.title} />
      {/*probably not the best way to handle alt*/}
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
              style={{ marginTop: "0" }}
            >
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

export default Post;
