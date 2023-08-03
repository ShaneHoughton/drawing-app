import Layout from "./Layout/Layout";
import Canvas from './Modals/Canvas/Canvas';
import Auth from "./Modals/Auth/AuthModals";
import SignOutModal from "./Modals/Auth/SignOutModal";
import {useSelector} from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
import UserProfile from "./Pages/UserProfile";

function App() {
  const showCanvas = useSelector(state=> state.ui.showCanvas);
  const showAuth = useSelector(state=> state.ui.showAuth);
  const showSignOut = useSelector(state=> state.ui.showSignOut);
  const scroll = useSelector(state=> state.ui.scroll);
  
  if(scroll){
    document.documentElement.style.overflow = ''; // Restore scrolling of the entire page
  } else {
    document.documentElement.style.overflow = 'hidden'; // Prevent scrolling of the entire page
  }
  
  
  return (
    <>
    <Router basename="/">
      <Layout>
        <div className="App">
          {/* TODO: PUT AUTH IN HERE */}
          {showCanvas && <Canvas />}
          {showAuth && <Auth/>}
          {showSignOut && <SignOutModal/>}
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/user" element={<UserProfile/>}/>
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

        </div>
      </Layout>
    </Router>
    </>
  );
}

export default App;
