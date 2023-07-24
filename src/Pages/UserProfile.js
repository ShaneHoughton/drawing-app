import { collection, query, where, orderBy } from "firebase/firestore"; 
import { db } from "../firebase";
import PostContainer from "../Post/PostContainer";
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from '../Layout/LoadingSpinner';

const UserProfile = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();
  console.log(auth.currentUser);
  
  const collectionRef = collection(db, "Posts");
  const userPostQuery = query(collectionRef, where("creator", "==", username), orderBy('date', 'desc'));
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUsername(user.displayName);
      } else {
        // User is signed out
        // Redirect to the homepage
        navigate('/drawing-app');
      }
    });
    localStorage.setItem('navPosition', 2);
    return () => unsubscribe();

  }, [auth, navigate]);



  if(!username){
    return <LoadingSpinner />
  }
  return (
    <PostContainer query={userPostQuery}/>
  )
}

export default UserProfile