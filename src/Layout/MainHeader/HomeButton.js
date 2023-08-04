import { Button } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";


const HomeButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const handleClick = ()=>{
    if (location.pathname !== '/') {
      dispatch(uiActions.clearPosts());
      navigate('/');
    }
  }

  return (
    <Button style={{ color: '#DEEFE7', fontWeight: 'bold' }} onClick={handleClick}>
      Home 🏠
    </Button>
  )
}

export default HomeButton;