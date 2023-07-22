import Post from './Post';
import classes from './PostContainer.module.css';
import { useSelector} from 'react-redux';

const PostContainer = () => {
  const postList = useSelector(state=> state.ui.posts);
  // console.log(postList);
  
  
  return (
    <ul className={classes.container}>
       {postList.map(post=>(
      <li key={post.id}>
        <Post 
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

export default PostContainer