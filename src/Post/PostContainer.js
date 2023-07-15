import React from 'react'
import Post from './Post';
import classes from './PostContainer.module.css';
import { useSelector } from 'react-redux';


const PostContainer = () => {
  const imageList = useSelector(state=> state.ui.posts);
  console.log(imageList[0]);
  return (
    <ul className={classes.container}>
       {imageList.map(post=>(
        <Post key={post.key} url={post.url} createdBy={post.metadata.customMetadata.createdBy}/>
      ))}
    </ul>
   
  )
}

export default PostContainer