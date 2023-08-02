import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const HomeButton = () => {
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate('/');
  }

  return (
    <Button style={{ color: '#DEEFE7', fontWeight: 'bold' }} onClick={handleClick}>
      Home 🏠
    </Button>
  )
}

export default HomeButton;