import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name:'ui',
    initialState:{notification: null, showCanvas: false, showAuth: false, posts:[]}, //notification for error
    reducers: {
        openCanvas(state){
            state.showCanvas = true;
        },

        closeCanvas(state){
            state.showCanvas = false;
        },

        openAuth(state){
            state.showAuth = true;
        },

        closeAuth(state){
            state.showAuth = false;
        },
        
        showNotification(state, action){
            state.notification = {
                status : action.payload.status,
                title : action.payload.title,
                message : action.payload.message
            }
        },

        loadPosts(state, action){
            if(!action.payload){
                console.log("NOPE");
                action.payload = [];
            }
            state.posts = action.payload;
            
            
            
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;