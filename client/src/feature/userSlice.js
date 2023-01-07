import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        nickname: "",
        address: "",
        balanceOf: "",
    },
    reducers:{
        setUser: (state, action)=>{
            const curUser = action.payload
            if(!curUser.nickname || !curUser.address || !curUser.balanceOf) return;
            state = curUser;
        },

        resetUser: (state)=>{
            state = {
                nickname: "",
                address: "",
                balanceOf: "",
            }
        }
    }
})

export const {setUser, resetUser} = userSlice.actions;

export default userSlice.reducer;