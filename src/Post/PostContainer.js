import Post from './Post';
import classes from './PostContainer.module.css';
import { useSelector} from 'react-redux';
import { auth } from '../firebase';
import { memo } from "react";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadPostData } from '../store/postActions';

const PostContainer = (props) => {
  const dispatch = useDispatch();
  const postList = useSelector(state=> state.ui.posts);
  const query = props.query; // needs to be a firebase query
  const [lastDoc, setLastDoc] = useState(null)

  useEffect(()=>{
    const recentLastDoc = dispatch(loadPostData(query));
    setLastDoc(recentLastDoc);

    }, [dispatch, query]);
  
  return (
    <ul className={classes.container}>
       {postList.map(post=>(
      <li key={post.id}>
        <Post
        currentUser={auth.currentUser} 
        id={post.id} 
        url={post.imgLink} 
        title={post.title}
        createdBy={post.creator}
        creatorId={post.creatorId}
        timeCreated={post.date} />
      </li>
      ))}
    </ul>
   
  )
}

export default memo(PostContainer);