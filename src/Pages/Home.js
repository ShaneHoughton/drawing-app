import { collection, query, where, orderBy, limit} from "firebase/firestore"; 
import { db } from "../firebase";
import PostContainer from "../Post/PostContainer";
import { useEffect } from "react";

const Home = () => {
  const collectionRef = collection(db, "Posts");
  const generalPostQuery = query(collectionRef, where("reported", "==", false), orderBy('date', 'desc'), limit(10));
  
  useEffect(() => { // for retrieving the navBar's previous value.
    
    localStorage.setItem('navPosition', 0);
  }, []);
  return (
    <PostContainer initQuery={generalPostQuery} />
  )
}

export default Home