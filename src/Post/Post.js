import React from 'react';

const Post = (props) => {
  console.log(props.createdBy);
  return (
    <li key={props.id}>
      <img src={props.url} alt={props.url}/>{/*probably not the best way to handle alt*/}
      <h4>{props.createdBy}</h4>
    </li>
   
  )
}

export default Post;