import LikeButton from "./LikeButton";
import { useState, useEffect } from "react";
import classes from "./Post.module.css";
import { auth } from "../firebase";
import {
  collection,
  query,
  where,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase";
import ActionsButton from "./ActionsButton";

const Post = (props) => {
  const [likes, setLikes] = useState(null);
  const postId = props.id;
  const currentUser = auth.currentUser; 

  let date = new Date(props.timeCreated).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const changeLike = (wasLiked) =>{//doing this so we can make one less request and change value on the UI.
    wasLiked ? setLikes(likes + 1) : setLikes(likes - 1); 
    if(likes < 0){setLikes(0)};
  }

  useEffect(() => {
    const getLikes = async () => {
      const coll = collection(db, "Likes");
      const q = query(coll, where("postId", "==", postId));
      const snapshot = await getCountFromServer(q);
      setLikes(snapshot.data().count);
    };
    getLikes();

  }, [postId, currentUser]);

  return (
    <>
      <img src={props.url} alt={props.title} />
      <div className={classes['post-title']}>{props.title}</div>
      <div className={classes["post-items"]}>
        <div className={classes["post-info"]}>
          <h4>{props.createdBy}</h4>
          {date}
        </div>
        <div className={classes["post-buttons"]}>
          <div className={classes["labeled-button"]}>
            <LikeButton postId={postId} onLike={changeLike}/>
            <span>{likes} Likes</span>
          </div>
          <div className={classes["labeled-button"]}>

          {/* <IconButton color='primary'>
              <MoreVertIcon/>
            </IconButton> */}

            <ActionsButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default  Post;
