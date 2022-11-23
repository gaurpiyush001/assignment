import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'loggedUserDetails',
    initialState: { 
        userDetails: undefined
    },
    /*this represents all the cases that we want to handle inside reducer4 function*/
    reducers: {
        changeUserDetailHandler(state, action) {
            state.userDetails= action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
