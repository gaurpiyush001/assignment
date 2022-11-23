import { authActions } from "../reducers/auth-slice"; 
import axios from 'axios';
axios.defaults.withCredentials = true

export const authSignUp = ({email, password, confirmPassword, name}) => {
    return async (dispatch) => {
      try{
      const config = {
        header: {
          'Content-type': 'application/json',
          withCredentials: true
        },
      }

      console.log('ARRRRA HAIII', email, password, confirmPassword, name)
  
      // dispatch({ type: SIGNUP_GET_REQUEST })
      const { data } = await axios.post(
        `http://localhost:3001/api/v1/signup`,
        {email, password, confirmPassword, name},
        config
      )

      console.log('dataaaaaaaaa->',data);
      const finaldata = data.data.user;

      dispatch(authActions.logInSuccess(finaldata));

      localStorage.setItem('user', JSON.stringify(finaldata));


    } catch (error) {
      dispatch(authActions.logInError())
    }
    };
  };


  export const authLogOut = (email) => {
    return async (dispatch) => {

      try{
        const config = {
          header: {
            'Content-type': 'application/json',
            withCredentials: true
          },
        }
  
        // console.log('ARRRRA HAIII', email, password, confirmPassword, name)
    
        // dispatch({ type: SIGNUP_GET_REQUEST })
        const { data } = await axios.get(
          `http://localhost:3001/api/v1/logout`
        )

        console.log('insisde log out ',data);
        localStorage.removeItem("user");
        
        dispatch(authActions.logOutSuccess())

      } catch(err){
        dispatch(authActions.logInError())
      }

    }
  }


  export const authLogIn = ({email, password}) => {
    return async (dispatch) => {
      try{
      const config = {
        header: {
          'Content-type': 'application/json',
          withCredentials: true
        },
      }

      // console.log('ARRRRA HAIII', email, password, confirmPassword, name)
  
      // dispatch({ type: SIGNUP_GET_REQUEST })
      const { data } = await axios.post(
        `http://localhost:3001/api/v1/login`,
        {email, password},
        config
      )

      console.log('dataaaaaaaaa->',data);
      const finaldata = data.data;

      dispatch(authActions.logInSuccess(finaldata));

      localStorage.setItem('user', JSON.stringify(finaldata));

    } catch (error) {
      dispatch(authActions.logInError())
    }
    };
  };

  export const authUserPost = (postText, email, name) => {
    return async (dispatch) => {
      try{
        const config = {
          header: {
            'Content-type': 'application/json',
            withCredentials: true
          },
        }
  
        // console.log('ARRRRA HAIII', email, password, confirmPassword, name)
    
        // dispatch({ type: SIGNUP_GET_REQUEST })
        const { data } = await axios.post(
          `http://localhost:3001/api/v1/users/post`,
          {postText, email, name},
          config
        )
  
        console.log('dataaaaaaaaa->',data);

  
      } catch (error) {
        dispatch(authActions.logInError())
      }
      };     
    }
  
