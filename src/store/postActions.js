import { uiActions } from './ui';
import { listAll, ref, getDownloadURL, getMetadata } from 'firebase/storage';
import { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export const loadPostData = () => {
  return async (dispatch) => {
    const imageListRef = ref(storage, 'images/');

    const getImageURLsAndMetadata = async () => {
      const response = await listAll(imageListRef);

      const promises = response.items.map(async (item) => {
        const [url, metadata] = await Promise.all([
          getDownloadURL(item),
          getMetadata(item),
        ]);

        return { url, metadata, key: uuidv4() };
      });

      const urlsAndMetadata = await Promise.all(promises);

      return urlsAndMetadata.reverse();
    };

    try {
      const imageUrls = await getImageURLsAndMetadata();
      console.log(imageUrls);
      dispatch(uiActions.loadPosts(imageUrls));
    } catch (error) {
      console.log('Error:', error);
    }
  };
};
