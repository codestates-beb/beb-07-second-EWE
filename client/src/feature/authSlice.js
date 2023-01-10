import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        accessToken: null,
        isLogin: false
    },
    reducers:{
        setAuth: (state, action)=>{
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