import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name:'ui',
    initialState:{notification: null, showCanvas: false, showAuth: false, showSignOut: false, posts:[]}, //notification for error
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

        openSignOut(state){
            state.showSignOut = true;
        },

        closeSignOut(state){
            state.showSignOut = false;
        },
        
        showNotification(state, action){
            state.notification = {
                status : action.payload.status,
                message : action.payload.message
            }
        },

        closeNotification(state){
            state.notification = null;
        },

        loadPosts(state, action){
            if(!action.payload){
                // console.log("NOPE");
                action.payload = [];
            }
            state.posts = action.payload;
            // console.log("getting posts", state.posts);
            
        },

        addPost(state, action){
            state.posts.unshift(action.payload);
            // console.log("push post", state.posts);
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;