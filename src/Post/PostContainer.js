import Post from './Post';
import classes from './PostContainer.module.css';
import { useSelector} from 'react-redux';
import { auth } from '../firebase';
import { memo } from "react";

const PostContainer = (props) => {
  const postList = useSelector(state=> state.ui.posts);
  
  
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
        timeCreated={post.date} />
      </li>
      ))}
    </ul>
   
  )
}

export default memo(PostContainer);