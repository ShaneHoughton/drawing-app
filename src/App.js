import Layout from "./Layout/Layout";
import PostContainer from "./Post/PostContainer";
import Canvas from './Post/NewPost/Canvas';
import {useSelector} from 'react-redux';
import { useEffect} from "react";
import { useDispatch } from "react-redux";
import { loadPostData } from "./store/postActions";


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(loadPostData());
    }, [dispatch]);
 
  const showModal = useSelector(state=> state.ui.showCanvas);

  return (
    <Layout>
      <div className="App">
        {showModal && <Canvas />}
        <PostContainer/>
       
      </div>
    </Layout>
  );
}

export default App;
