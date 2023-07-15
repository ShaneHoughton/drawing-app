import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './ui';
import userReducer from './user';



const store = configureStore({
    reducer: {
        ui: uiReducer,
        user: userReducer
    }
});


export default store;
