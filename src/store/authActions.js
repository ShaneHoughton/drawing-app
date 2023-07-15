import { userActions } from './user';

export const loginUser = () => {
  return async (dispatch) => {
    try {
      console.log("logging in");
      dispatch(userActions.Login());
    } catch (error) {
      console.log('Error: logging in ---', error);
    }
  };
};


export const logoutUser = () => {
  return async (dispatch) => {
    try {
      console.log("logging out");
      dispatch(userActions.Logout());
    } catch (error) {
      console.log('Error: logging out ---', error);
    }
  };
};
