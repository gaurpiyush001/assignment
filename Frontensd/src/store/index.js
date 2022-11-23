import { configureStore } from '@reduxjs/toolkit';

// import counterReducer from './counter';
import authReducer from './reducers/auth-slice';


const store = configureStore({
  reducer: { auth: authReducer },
});

export default store;
