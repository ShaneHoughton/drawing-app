import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:'auth',
    initialState:{auth: null}, //notification for error
    reducers: {
        Login(state){
          state.loggedIn = true;
        },
        Logout(state){
          state.loggedIn = false;
        }
      }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;