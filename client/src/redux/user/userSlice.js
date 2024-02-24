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
            state.loading=true;
        },
        signInSuccess : ( state , action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state , action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart:(state, action)=>{
            state.currentUser = action.payload;
            state.loading=true;
            state.error=null;
    },
    updateUserSuccess:(state, action)=>{
        state.currentUser = action.payload;
        state.loading=false;
        state.error=null;
    },
        
    updateUserFailure:(state, action) =>{
        state.error=action.payload;
        state.loading=false;
}
    }
});
export const { signInStart , signInSuccess, signInFailure , updateUserFailure, updateUserStart , updateUserSuccess} = userSlice.actions;

export default userSlice.reducer;