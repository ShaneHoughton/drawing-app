import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name:'ui',
    initialState:{notification: null, scroll:true, showCanvas: false, showAuth: false, showSignOut: false, posts:[], lastDoc: null}, //notification for error
    reducers: {
        openCanvas(state){
            state.showCanvas = true;
            state.scroll = false;
        },

        closeCanvas(state){
            state.showCanvas = false;
            state.scroll = true;
        },

        openAuth(state){
            state.showAuth = true;
            state.scroll = false;
        },

        closeAuth(state){
            state.showAuth = false;
            state.scroll = true;
        },

        openSignOut(state){
            state.showSignOut = true;
            state.scroll = false;
        },

        closeSignOut(state){
            state.showSignOut = false;
            state.scroll = true;
        },

        stopScroll(state){
            state.scroll = false;
        },

        allowScroll(state){
            state.scroll = true;
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

        setLastDoc(state, action){
            state.lastDoc = action.payload;
        },

        addPost(state, action){
            state.posts.unshift(action.payload);
            // console.log("push post", state.posts);
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;