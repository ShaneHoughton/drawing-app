import { uiActions } from './ui';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"; 
import { db } from '../firebase';

export const loadPostData = () => {
  return async (dispatch) => {
    
    const getItemsFromCollection = (collectionName) => {
      return new Promise((resolve, reject) => {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, where("reported", "==", false), orderBy('date', 'desc'));
        getDocs(q)
          .then((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              // doc represents a document in the collection
              // You can access its data using doc.data()
              items.push({
                id: doc.id,
                ...doc.data()
              });
            });
            resolve(items);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    try {
      const items = await getItemsFromCollection("Posts");
      dispatch(uiActions.loadPosts(items));
    } catch (error) {
      console.log('Error:', error);
    }
  };
};
