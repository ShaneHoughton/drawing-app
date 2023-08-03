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
import ActionsMenu from "./ActionsMenu";
import ActionModal from "../Modals/Actions/ActionModal";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui";

const Post = (props) => {
  const [likes, setLikes] = useState(null);
  const [actionState, setActionState] = useState(null);
  const dispatch = useDispatch();
  const postId = props.id;
  const currentUser = auth.currentUser; 

  let date = new Date(props.timeCreated).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const actionStateHandler = (state) =>{
    setActionState(state);
    if(state){
      dispatch(uiActions.stopScroll())
      return
    }
    dispatch(uiActions.allowScroll())
  }

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
      {actionState && 
      <ActionModal 
      onClose={()=>{actionStateHandler(null)}}
      creatorId={props.creatorId}
      createdBy={props.createdBy}
      postId={postId}
      src={props.url} 
      alt={props.alt} 
      title={props.title}
      option={actionState}/>
      }
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


            {/* <ActionsMenu creatorId={props.creatorId} actionStateHandler={actionStateHandler}/> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default  Post;
