import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        accessToken: null,
    },
    reducers:{
        setUser: (state, action)=>{
            state.accessToken = action.payload.accessToken;
        },

        resetUser: (state)=>{
            state = null;
        }
    }
})

export const {setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;