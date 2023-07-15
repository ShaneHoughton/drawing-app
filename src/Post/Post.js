import React from 'react';

const Post = (props) => {
  console.log(props.createdBy);
  let date = new Date(props.timeCreated).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
  console.log(date);
  return (
    <li key={props.id}>
      <img src={props.url} alt={props.url}/>{/*probably not the best way to handle alt*/}
      <div>
        <strong>{props.createdBy} </strong>
        {date}
      </div>
      
    </li>
   
  )
}

export default Post;