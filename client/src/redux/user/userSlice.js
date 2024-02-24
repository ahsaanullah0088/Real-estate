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
},
 deleteUserStart : (state) =>{
     state.loading = true;
},
deleteUserSuccess  : (state) =>{
    state.currentUser= null;
    state.loading=false;
    state.error=null;
},
deleteUserFailure :(state , action) =>{
    state.error=action.payload;
    state.error = false;    
},
signOutUserStart : (state) =>{
    state.loading = true;
},
singOutUserSuccess  : (state) =>{
   state.currentUser= null;
   state.loading=false;
   state.error=null;
},
singOutUserFailure :(state , action) =>{
   state.error=action.payload;
   state.error = false;    
},
    }
});
export const { signInStart , signInSuccess, signInFailure , updateUserFailure, updateUserStart , updateUserSuccess , deleteUserFailure , deleteUserStart , deleteUserSuccess , signOutUserStart, singOutUserFailure,singOutUserSuccess} = userSlice.actions;

export default userSlice.reducer;