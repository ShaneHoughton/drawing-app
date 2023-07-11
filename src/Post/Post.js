import React from 'react';

const Post = (props) => {
  return (
    <li key={props.id}>
      <img src={props.url} alt={props.url}/>{/*probably not the best way to handle alt*/}
    </li>
   
  )
}

export default Post;