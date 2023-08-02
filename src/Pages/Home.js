import { collection, query, where, orderBy } from "firebase/firestore"; 
import { db } from "../firebase";
import PostContainer from "../Post/PostContainer";
import { useEffect } from "react";

const Home = () => {
  const collectionRef = collection(db, "Posts");
  const generalPostQuery = query(collectionRef, where("reported", "==", false), orderBy('date', 'desc'));

  useEffect(() => { // for retrieving the navBar's previous value.
    localStorage.setItem('navPosition', 0);
  }, []);
  return (
    <PostContainer query={generalPostQuery}/>
  )
}

export default Home