import { uiActions } from './ui';
import { collection, getDocs, getDoc, query, where, orderBy } from "firebase/firestore"; 
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

export const AddUploadedPost = (docRef) =>{
  return async (dispatch) => {
    const addItem = (docRef) =>{
      return new Promise((resolve, reject) => {
        getDoc(docRef).then((docSnap)=>{
          // console.log(">", docSnap.data())
          resolve({id:docSnap.id, ...docSnap.data()});
        }).catch((error)=>{
          console.log(error);
          reject(error);
        })
        }
      );
    }

    try {
      const item = await addItem(docRef);
      dispatch(uiActions.addPost(item));
    } catch (error) {
      console.log('Error:', error);

  }
  }
}
