import { collection, query, where, orderBy } from "firebase/firestore"; 
import { db } from "../firebase";
import PostContainer from "../Post/PostContainer";

const Home = () => {
  const collectionRef = collection(db, "Posts");
  const generalPostQuery = query(collectionRef, where("reported", "==", false), orderBy('date', 'desc'));

  return (
    <PostContainer query={generalPostQuery}/>
  )
}

export default Home