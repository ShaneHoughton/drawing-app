import { uiActions } from './ui';
import { getDocs, getDoc } from "firebase/firestore"; 

export const loadPostData = (query) => {
  return async (dispatch) => {
    try {
      const querySnapshot = await getDocs(query);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      console.log(lastDoc)
      console.log(items);
      dispatch(uiActions.loadPosts(items));
      return lastDoc;
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
