import { uiActions } from './ui';
import { listAll, ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export const loadPostData = () => {
  return async (dispatch) => {
    const imageListRef = ref(storage, 'images/');

    const getImageURLs = async () => {
      const response = await listAll(imageListRef);
      const promises = response.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { url, key: uuidv4() };
      });
      const urls = await Promise.all(promises);
      return urls.reverse();
    };

    try {
      const imageUrls = await getImageURLs();
      console.log(imageUrls);
      dispatch(uiActions.loadPosts(imageUrls));
    } catch (error) {
      console.log('Error:', error);
    }
  };
};
