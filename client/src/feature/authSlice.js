import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userID: null,
        accessToken: null,
        isLogin: false,
    },
    reducers:{
        setAuth: (state, action)=>{
            state.userID = action.payload.userID;
            state.accessToken = action.payload.accessToken;
            state.isLogin = true;
        },

        resetAuth: (state)=>{
            state.accessToken = null;
            state.isLogin= false;
        }
    }
})

export const {setAuth, resetAuth} = authSlice.actions;

export default authSlice.reducer;