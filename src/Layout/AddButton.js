import { uiActions } from '../store/ui';
import {useDispatch} from 'react-redux';
import classes from './AddButton.module.css';

const AddButton = (props) => {
  const dispatch = useDispatch();

  const openModalHandler = () =>{
    dispatch(uiActions.toggleModal());
  }

  return (
    <button onClick={openModalHandler} className={classes.button}>
      <span >Add a masterpiece</span>
      {/* <span className={classes.badge}>hello</span> */}
    </button>
  );
};

export default AddButton;
