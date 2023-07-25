import classes from './NotificationBanner.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { uiActions } from '../../store/ui';

const NotificationBanner = () => {
  const notification = useSelector(state=> state.ui.notification);
  const dispatch = useDispatch();
  const message = notification !== null ? notification.message : '...';
  const status = notification !== null ? notification.status : 'success';

  useEffect(()=>{
    if(notification){
      setTimeout(()=>{
        dispatch(uiActions.closeNotification());
      }, 3000);
    }
  },[notification, dispatch])
  return (
    <div className={
      `${classes.notification} 
      ${notification? classes.show : classes.hide}
      ${status==='success'? classes.success : classes.fail}
      `}>{message}</div>
  )
}

export default NotificationBanner;