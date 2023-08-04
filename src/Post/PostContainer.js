import Post from "./Post";
import classes from "./PostContainer.module.css";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { memo } from "react";
import { 
  query, 
  startAfter
} from "firebase/firestore"; 
import { 
  useEffect, 
  useState 
} from "react";
import { useDispatch } from "react-redux";
import { loadPostData } from "../store/postActions";
import LoadingSpinner from '../Layout/LoadingSpinner';



const PostContainer = (props) => {
  const [lastDoc, setLastDoc] = useState(null);
  const [firstRender, setFirstRender] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.ui.posts);
  const initQuery = props.initQuery; // needs to be a firebase query

  useEffect(() => {
    console.log("first render", firstRender)
    const paginate = async () => {
      if(!firstRender && !lastDoc) return;

      if (lastDoc && !firstRender) {
        console.log(lastDoc);
        const recentLastDoc = await dispatch(
          loadPostData(query(initQuery, startAfter(lastDoc)))
        );
        setLastDoc(recentLastDoc);
        return;
      }

      setFirstRender(false);
      const initialLastDoc = await dispatch(loadPostData(initQuery));
      setLastDoc(initialLastDoc);
    };
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
  
      if (scrollPosition + windowHeight >= fullHeight) {
        // User has scrolled to the bottom
        setIsLoading(true);
        paginate(); 
        setIsLoading(false);
      }
    };

    if(firstRender){
      setIsLoading(true);
      paginate();
      setIsLoading(false);
      return
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch, initQuery, lastDoc, firstRender]);

  return (
    <>
    <ul className={classes.container}>
      {postList.map((post) => (
        <li key={post.id}>
          <Post
            currentUser={auth.currentUser}
            id={post.id}
            url={post.imgLink}
            title={post.title}
            createdBy={post.creator}
            creatorId={post.creatorId}
            timeCreated={post.date}
          />
        </li>
      ))}
    </ul>
    {isLoading && <LoadingSpinner/>}
    </>
  );
};

export default memo(PostContainer);
