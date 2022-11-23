import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'authentication',
    initialState: { loggedIn: false, user: undefined},
    /*this represents all the cases that we want to handle inside reducer4 function*/
    reducers: {
        logInSuccess(state, action){
            state.loggedIn = true;
            console.log('state.payload ->', action.payload);
            state.user = action.payload;
        },
        logOutSuccess(state){
            state.loggedIn = false;
            console.log('loggout in slice');
            state.user = undefined;
        },
        logInError(state, action){
            state.loggedIn = false;
            state.user = undefined;
        }

    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

//----------------------------------------------------------------


// import { createSlice } from '@reduxjs/toolkit';

// const initialAuthState = {
//   isAuthenticated: false,
// };

// const authSlice = createSlice({
//   name: 'authentication',
//   initialState: initialAuthState,
//   reducers: {
//     login(state) {
//       state.isAuthenticated = true;
//     },
//     logout(state) {
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const authActions = authSlice.actions;

// export default authSlice.reducer;

