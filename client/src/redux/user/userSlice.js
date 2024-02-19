import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error:null,
    loding:false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart : (state)=>{
            state.loding=true;
        },
        signInSuccess : ( state , action)=>{
            state.currentUser = action.payload;
            state.loding = false;
            state.error = null;
        },
        signInFailure:(state , action)=>{
            state.error = action.payload;
            state.loding = false;
        }
    },
})

export const { signInStart , signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;