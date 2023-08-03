import { uiActions } from './ui';
import { getDocs, getDoc } from "firebase/firestore"; 

export const loadPostData = (query) => {
  return async (dispatch) => {
    
    const getItemsFromCollection = () => {
      return new Promise((resolve, reject) => {
        getDocs(query)
          .then((querySnapshot) => {
            const items = [];
            let lastDoc = null;
            querySnapshot.forEach((doc) => {
              // doc represents a document in the collection
              // You can access its data using doc.data()
              items.push({
                id: doc.id,
                ...doc.data()
              });
              lastDoc = doc;
            });
            resolve({items, lastDoc});
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    try {
      const {items, lastDoc} = await getItemsFromCollection();
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
